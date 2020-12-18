import {takeLatest, put, all, call} from 'redux-saga/effects';
import userActionTypes from './user.types';
import {auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import {signInFail, signInSuccess, signOutFail, signOutSuccess, signUpFail} from './user-action';

export function* getSnapshotFromUserauth(userAuth, additionalData={}) {
    try{
        const userRef = yield createUserProfileDocument(userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
        }))
    }catch(error) {
        yield put(signInFail(error.message));
    }
}

export function* signInWithGoogle() {
    try{
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserauth(user);
    } catch (error) {
        yield put(signInFail(error.message));
    }
}
export function* signInWithEmail({payload: {email, password}}) {
    try{
       const {user} = yield auth.signInWithEmailAndPassword(email, password);
       yield getSnapshotFromUserauth(user);
    } catch (error) {
        yield put(signInFail(error.message));
    }
}
export function* isUserAuthenticated() {
    try{
        const user = yield getCurrentUser();
        if(!user) return;
        yield getSnapshotFromUserauth(user);
    }catch(error) {
        yield put(signInFail(error.message));
    }
}
export function* signOut() {
    try{
        yield auth.signOut();
        yield put(signOutSuccess())
    }catch(error) {
        yield put(signOutFail())
    }
}
export function* signUp({payload: {email,displayName,password,confirmPassword}}) {
    try{
        if(password !== confirmPassword){
            alert('passwords does not match!');
            return;
        }
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        yield getSnapshotFromUserauth(user, {displayName});
    }catch(error) {
        yield put(signUpFail(error.message));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}
export function* onEmailSignInStart() {
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
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
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart), call(onCheckUserSession), call(onSignOutStart), call(onSignUpStart)])
}