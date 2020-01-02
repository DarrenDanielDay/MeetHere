import { User } from '@/model/entity/user';
import { UserBean } from '@/model/bean/user-bean';
import { forceCast } from '@/util/cast';
import { Optional } from '@/model/bean/bean';

export namespace userverification {

    const cache = "usercache"
    const currentUser: User = User._empty();

    export function getCurrentUser() {
        let usercache = localStorage.getItem(cache);
        if (usercache) {
            let userbean = JSON.parse(usercache);
            currentUser.update(forceCast(userbean));
        } else {
            currentUser.isLoggedIn = false;
        }
        return currentUser;
    }

    // export function setCurrentUser(user: UserBean) {
    //     currentUser.update(user)
    //     saveCurrentUser()
    // }
    
    export function saveCurrentUser() {
        console.log(currentUser, "saving...")
        localStorage.setItem(cache, JSON.stringify(currentUser));
    }

    export function updateCurrentUser(user: Optional<UserBean>) {
        console.log('updating')
        currentUser.update(user);
        console.log(currentUser,"current user")
        saveCurrentUser();
    }

    export function clearCurrentUser() {
        localStorage.removeItem(cache);
        currentUser.isLoggedIn = false;
    }
}
