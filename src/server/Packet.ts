export default interface Packet<T = any[]> {
   date: Date,
   data: T
};