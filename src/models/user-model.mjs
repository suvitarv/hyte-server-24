import promisePool from '../utils/database.mjs';

const listAllUsers = async () => {
    try {
    const sql = 'SELECT user_id, username, user_level FROM Users';
    const [rows] = await promisePool.query(sql);
    //*console.log(rows);
    return rows;
    } catch (error) {
        console.error('listAllUsers', error);
        return {error: 500, message: 'db error'};
    }
};

const selectUserById = async (id) => {
    try {
    const sql = 'SELECT * FROM Users WHERE user_id=?';
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    console.log(rows);
    if (rows.length === 0) {
        return {error: 404, message: 'User not found'};
    }
    //Remove password property from result
    delete rows[0].password;
    return rows[0];
    } catch (error) {
        console.error('selectUserById', error);
        return {error: 500, message: 'db error'};
    }
};

const insertUser = async (user, next) => {
    try {
        const sql = 'INSERT INTO Users (username, password, email) VALUES (?, ?, ?)';
        const params = [user.username, user.password, user.email];
        const [result] = await promisePool.query(sql, params);
        console.log(result);
        return {message: 'new user created', user_id: result.insertId};

        } catch (error) {
            console.error('insertUser', error);
           
            return next(new Error(error));
        }
};

const updateUserById = async (user) => {
    try {
        const sql = 'UPDATE Users SET username=?, password=?, email=? WHERE user_id=?';
        const params = [user.username, user.password, user.email, user.user_id];
        const [result] = await promisePool.query(sql, params);
        console.log(result);
        return {message: 'user data updated', user_id: user.user_id};

        } catch (error) {
            console.error('updateUserById', error);
            return {error: 500, message: 'db error'};
        }

};

const deleteUserById = async (id) => {
    try {
        const sql = 'DELETE FROM Users WHERE user_id=?';
        const params = [id];
        const [result] = await promisePool.query(sql, params);
        //*console.log(result);
        if (result.affectedRows === 0) {
            return {error: 404, message: 'user not found'};
        }
        return {message: 'user deleted', user_id: id};

        } catch (error) {
            console.error('deleteUserById', error);
            return {error: 500, message: 'db error'};
        }
};

const selectUserByUsername = async (username, password) => {
    try {
      const sql = 'SELECT * FROM Users WHERE username=?';
      const params = [username, password];
      const [rows] = await promisePool.query(sql, params);
      //console.log(rows);
      // if nothing is found with the username and password, login attempt has failed
      if (rows.length === 0) {
        return {error: 401, message: 'invalid username or password'};
      }
      // Otherwise, remove password property from the result and return the user object

      return rows[0];
    } catch (error) {
      console.error('selectUserByNameAndPassword', error);
      return {error: 500, message: 'db error'};
    }
  };


export {listAllUsers, selectUserById, insertUser, updateUserById, deleteUserById, selectUserByUsername};