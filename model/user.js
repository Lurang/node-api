const argon2 = require('argon2');

const db = require('../util/database');

module.exports = class User {
    constructor(id, name, password){
        this.id = id;
        this.name= name;
        this.password = password;
    }
    
    toHash() {
        return new Promise((res, rej) => {
            try{
                const hash = argon2.hash(this.password)
                res(
                    hash
                )
            } catch {

            }
        })
    }
    save() {
        return new Promise((res, rej) => {
            res(
                this.toHash()
                .then((hash) => {
                    return new Promise((res, rej) => {
                        res(
                            this.password = hash,
                            db.execute(`insert into customer values(?, ?, ?)`, [this.id, this.name, this.password]),
                        )
                    })
                })
            )
        })
    }
    /*
    save() {
        return new Promise((res, rej) => {
            this.hash()
            .then((hash) => {
                console.log('2 => ' + hash)
                this.password = hash;          
                console.log(this.password)
            })
            .then(
                console.log('3 => ' + this.password),
                db.execute(`insert into customer values(?, ?, ?)`, [this.id, this.name, this.password])
            )
        })
    }
    */
    updateById() {
        return db.execute(`update customer set c_name = ? where c_id = ?`, [this.name, this.id]);
    }
    deleteById() {
        return db.execute(`delete from customer where c_id = ?`, [this.id]);
    }

    static verifyPassword(hash, pass) {
        const result = argon2.verify(hash, pass);
        return result;
    }
    static fetchAll() {
        return db.execute('select c_id, c_name from customer');
    }
    static findById(id) {
        return db.execute(`select c_id, c_name from customer where c_id = ?`, [id]);
    }
    static login(id) {
        return db.execute(`select password from customer where c_id = ?`, [id]);
    }
}