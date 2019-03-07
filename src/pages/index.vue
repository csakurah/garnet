<template>
  <main>
    <section class="hero mainvisual is-medium is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Garnet
          </h1>
          <h2 class="subtitle">
            お手軽に始められる、観葉植物のための見守りプラットフォーム
          </h2>
        </div>
      </div>
    </section>

    <section class="hero is-medium">
      <div class="hero-body has-text-centered">
        <h3 class="title is-3">
          Garnetとは
        </h3>
        <p>観葉植物の土壌水分量をマイクロコンピューターで24時間監視し、Web上やメール配信で水やり時期を自動的に知ることができるサービスです。</p>
        <p>このサービスを利用することで、忙しい日々の中でうっかり水やりをすることを忘れ、大切にしていた観葉植物を枯らしてしまうことを防ぎます。</p>
      </div>
    </section>

    <section class="section has-background-light">
      <div class="container">
        <nav class="columns has-text-centered">
          <div class="column">
            <h4 class="title is-4">
              監視
            </h4>
            <p>
              マイクロコンピューターと土壌センサーによりお持ちの観葉植物の土壌水分量を24時間監視します。セッティング方法はとても簡単、10分で完了します。
            </p>
          </div>
          <div class="column">
            <h4 class="title is-4">
              記録
            </h4>
            <p>
              マイクロコンピューターから送信された監視ログはこのサービス上に記録・蓄積されます。お手持ちのスマートフォンでどこからでも観葉植物の土壌水分量を確認できます。
            </p>
          </div>
          <div class="column">
            <h4 class="title is-4">
              通知
            </h4>
            <p>
              観葉植物の土壌水分量が一定の値を下回ったとき、メールであなたに通知をします。これにより水のあげ忘れやあげ過ぎを防ぎ、観葉植物にとってベストな水やり時期を把握できます。
            </p>
          </div>
        </nav>
      </div>
    </section>

    <section class="hero is-medium">
      <div class="hero-body has-text-centered">
        <div class="columns">
          <div class="column">
            <h3 class="title is-3">
              さあ、さっそく始めましょう
            </h3>
            <p>2ステップで観葉植物の監視を始めることができます。</p>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="box">
              <h4 class="title is-5">
                アカウント登録
              </h4>
              <p>サービスの利用にはアカウント登録が必要です。<br>Googleアカウントをお持ちであればすぐに始めることができます。</p>
              <div class="buttons is-centered mt-1">
                <a class="button is-primary">アカウント登録</a>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="box">
              <h4 class="title is-5">
                マイコン準備
              </h4>
              <p>監視のためのマイクロコンピューターを用意し、サービスが利用できるように設定する必要があります。</p>
              <div class="buttons is-centered mt-1">
                <a class="button is-primary">詳しくはこちら</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.mainvisual {
  z-index: 0;
  overflow: hidden;
  background: rgba(50, 180, 60, 0.1);
  position: relative;
}

.mainvisual::before {
  content: '';
  background: url('~assets/img/mainvisual.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.8;
  filter: blur(3px);
  position: absolute;
  top: -4px;
  right: -4px;
  bottom: -4px;
  left: -4px;
  z-index: -1;
}

.mt-1 {
  margin-top: 1rem;
}
</style>

<script>
</script>
