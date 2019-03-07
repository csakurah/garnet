<template>
  <div>
    <section class="hero is-small is-light">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            植物一覧
          </h1>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-one-third">
            <a @click.prevent="$emit('show-detail', '1')">
              <div class="card">
                <div class="card-image">
                  <figure class="image is-16by9">
                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                  </figure>
                </div>

                <div class="card-content">
                  <h2 class="title is-6">
                    さんぷるさんの植物
                  </h2>
                  <p>登録数：2個</p>
                  <p>更新日時：2019/03/01 00:00:00</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
