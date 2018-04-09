/**
 * Check if a record is an object.
 * 
 * @param {*} val 
 * @return {boolean}
 */
export function isObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]'
}

/**
 * Normalize Firebase snapshot into a bindable data record.
 * 
 * @param {FirebaseSnapshot} snapshot
 * @return {object}
 */
export function normalize(snapshot) {
    let doc = snapshot.doc || snapshot
    var value = doc.data()
    var out = isObject(value) ? value : { '.value': value }
    out.id = doc.id
    out.delete = () => doc.ref.delete()
    out.set = (data) => doc.ref.set(data)
    out.update = (data) => doc.ref.update(data)
    return out;
}

/**
 * Ensure firebasestore option on a vue instance.
 * 
 * @param {Vue} vm 
 */
export function ensureRefs(vm) {
    if (!vm.$firestore) {
        vm.$firestore = Object.create(null)
    }
}