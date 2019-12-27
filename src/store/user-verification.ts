import { User } from '@/model/entity/user';
import { UserBean } from '@/model/bean/user-bean';
import { forceCast } from '@/util/cast';

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

    export function setCurrentUser(user: UserBean) {
        localStorage.setItem(cache, JSON.stringify(user));
    }

    export function updateCurrentUser(user: UserBean) {
        return setCurrentUser(user);
    }

    export function clearCurrentUser() {
        localStorage.removeItem(cache);
        currentUser.isLoggedIn = false;
    }
}
