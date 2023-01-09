function load() {
  let jwt = localStorage.getItem("jwt")
  if (!jwt) { //如果jwt为空，将跳转至登录页面
    console.log("这是loadPage.js");
    // location.href="/login"
  }
}

export {
  load
}