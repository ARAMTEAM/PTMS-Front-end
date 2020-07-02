<template>
  <html>
    <body>
      <main class="main">
        <a href="/login_admin" style="width: 100%;">
          <section class="list-item">
            <div class="item-image">
              <img src="../assets/background/1.jpg" alt="image-1">
            </div>
            <div class="item-text">
              <div class="text-title">「管理员登录」</div>
              <div class="text-desc">管理员登录请点击此处</div>
            </div>
          </section>
        </a>

        <a href="/login_jiaowu" style="width: 100%;">
        <section class="list-item">
          <div class="item-image">
            <img src="../assets/background/2.jpg" alt="image-2">
          </div>
          <div class="item-text">
            <div class="text-title">「教务登录」</div>
            <div class="text-desc">教务登录请点击此处</div>
          </div>
        </section>
        </a>


        <a href="/login_teacher" style="width: 100%;">
        <section class="list-item">
          <div class="item-image">
            <img src="../assets/background/3.jpg" alt="image-3">
          </div>
          <div class="item-text">
            <div class="text-title">「教师登录」</div>
            <div class="text-desc">教师登录请点击此处</div>
          </div>
        </section>
        </a>
        <a href="/login_student" style="width: 100%;">
        <section class="list-item">
          <div class="item-image">
            <img src="../assets/background/4.jpg" alt="image-4">
          </div>
          <div class="item-text">
            <div class="text-title">「学生登录」</div>
            <div class="text-desc">学生登录请点击此处</div>
          </div>
        </section>
        </a>

      </main>
    </body>
    
  </html>
</template>

<script>
// @ is an alias to /src
export default {
}
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  html, body {
    padding: 0;
    margin: 0;
  }

  html {
    /* 需要隐藏最外层不可见区域以使视差生效 */
    overflow: hidden;
  }

  body {
    width: 100vw;
    height: 100vh;
    perspective: 100px;
    transform-style: preserve-3d;
    /* 3D的容器要允许overflow才能生效 */
    overflow-y: auto;
  }

  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .list-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 50vh;
    overflow: hidden;
  }

  .list-item:hover .item-image::before {
    background-color: rgba(0, 0, 0, 0.2);
  }

  .item-image {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translateZ(-50px) scale(2.4);
    z-index: -1;
  }

  .item-image::before {
    position: absolute;
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
    background-color: rgba(0, 0, 0, .4);
  }

  .item-image img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .item-text {
    font-family: 'Courier New', Courier, monospace;
    text-align: center;
    color: #ffffff;
  }

  .text-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .text-desc {
    font-size: 1.2rem;
  }
</style>