import { executeQueryAsync } from "../data-access-layer/dal.js"

export async function isRegistered(userCreds) {
    try {
        const user = await executeQueryAsync(`select * from customers where userName=? and password=?`, [userCreds.email, userCreds.password]);
        return user;
    } catch (error) {
        console.log(error);
    }
}

