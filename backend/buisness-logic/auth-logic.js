import { v4 as uuidv4 } from 'uuid';

import { executeQueryAsync } from "../data-access-layer/dal.js"

export async function isRegistered(userCreds) {

        const user = await executeQueryAsync(`select * from customers where userName=? and password=?`, [userCreds.email, userCreds.password]);
        return user[0];

}
export async function verify(halfUser) {

        try {
                const idTaken = await executeQueryAsync(`
        select id,userName from customers where id='${halfUser.id}' or userName='${halfUser.email}'`
                );


                if (idTaken.length >= 1) {

                        return idTaken
                }
                else {

                        return idTaken
                }
        } catch (error) {
                return error
        }
}
export async function register(user) {
        try {


                const result = await executeQueryAsync(`INSERT INTO customers 
                        (id,firstName,lastName,userName,password,city,street)
                        VALUES
                        (?,?,?,?,?,?,?)`,
                        [user.id, user.firstName, user.lastName, user.email, user.password, user.city, user.street]
                );
                if (result) {
                        console.log(result, 'RESLUT');
                        return result;
                }
        }
        catch (error) {
                return error;
        }
}
export async function getUserDetails(id) {
        const result = await executeQueryAsync(`select firstName,userName from customers where id=?`, [id])
        return result
}

