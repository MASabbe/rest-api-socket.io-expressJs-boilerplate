const isValidEvent = (socket, next) => {
  socket.use(([event,data,callback])=>{
    try{
      next();
    }catch (e) {
      next(e);
    }
  });
}
export default isValidEvent;
