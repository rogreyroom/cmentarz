import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

const userDataPath = remote.app.getPath('documents');

export default new Datastore({
    autoload: true,
    filename: path.join(userDataPath, './cmentarz/db/cm.db')
})
