import { takeLatest, put, all, call } from "redux-saga/effects";
import userActionTypes from "./user.types";
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
  isGharakExist,
  isKarigarExist,
} from "../../firebase/firebase.utils";
import {
  signInFail,
  signInSuccess,
  signOutFail,
  signOutSuccess,
  signUpFail,
} from "./user-action";

export function* getSnapshotFromUserauth(
  userAuth,
  selectedUser,
  additionalData = {}
) {
  try {
    const userRef = yield createUserProfileDocument(userAuth, selectedUser, {
      user: selectedUser,
      ...additionalData,
    });
    const userSnapshot = yield userRef.get();
    yield put(
      signInSuccess({
        id: userSnapshot.id,
        ...userSnapshot.data(),
      })
    );
  } catch (error) {
    yield put(signInFail(error.message));
  }
}

export function* signInWithGoogle({ payload: selectedUser }) {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    let GharakExist = yield isGharakExist(user);
    let karigarExist = yield isKarigarExist(user);

    if (
      (GharakExist && !karigarExist && selectedUser === "Gharak") ||
      (karigarExist && !GharakExist && selectedUser === "Karigar") ||
      (!karigarExist && !GharakExist)
    ) {
      yield getSnapshotFromUserauth(user, selectedUser);
    } else {
      alert("One account can be linked to one profile only");
      yield auth.signOut();
    }
  } catch (error) {
    yield put(signInFail(error.message));
  }
}
export function* signInWithEmail({
  payload: { email, password, selectedUser },
}) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    let userExist;
    if (selectedUser === "Gharak") {
      userExist = yield isGharakExist(user);
    } else if (selectedUser === "Karigar") {
      userExist = yield isKarigarExist(user);
    }
    if (userExist) {
      yield getSnapshotFromUserauth(user, selectedUser);
    } else {
      alert("Data is incorrect");
      yield auth.signOut();
    }
  } catch (error) {
    yield put(signInFail(error.message));
  }
}
export function* isUserAuthenticated() {
  try {
    const user = yield getCurrentUser();
    if (!user) return;
    yield getSnapshotFromUserauth(user);
  } catch (error) {
    yield put(signInFail(error.message));
  }
}
export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFail());
  }
}
export function* signUp({
  payload: { email, displayName, password, confirmPassword, selectedUser },
}) {
  try {
    if (password !== confirmPassword) {
      alert("passwords does not match!");
      return;
    }
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield getSnapshotFromUserauth(user, selectedUser, { displayName });
  } catch (error) {
    yield put(signUpFail(error.message));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}
export function* onEmailSignInStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}
export function* onCheckUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}
export function* onSignOutStart() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signOut);
}
export function* onSignUpStart() {
  yield takeLatest(userActionTypes.SIGN_UP_START, signUp);
}

export function* userSaga() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
  ]);
}
