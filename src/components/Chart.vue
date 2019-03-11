<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  mounted() {
    this.renderChart({
      labels: [
        '2019/03/01',
        '2019/03/02',
        '2019/03/03',
        '2019/03/04',
        '2019/03/05',
        '2019/03/06',
        '2019/03/07'
      ],
      datasets: [
        {
          label: 'さんぷる植物1',
          backgroundColor: 'rgba(60, 160, 220, 0.3)',
          borderColor: 'rgba(60, 160, 220, 0.3)',
          data: [60, 45, 20, 90, 85, 70, 55]
        },
        {
          label: 'さんぷる植物2',
          backgroundColor: 'rgba(140, 70, 50, 0.3)',
          borderColor: 'rgba(140, 70, 50, 0.3)',
          data: [95, 90, 87, 54, 43, 27, 19]
        }
      ]
    })
  }
}
</script>
