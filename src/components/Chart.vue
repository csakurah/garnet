<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    plants: {
      type: Array,
      default: null
    }
  },
  mounted() {
    // eslint-disable-next-line
    console.log(this.plants)
    this.renderChart(
      {
        datasets: [
          {
            label: 'さんぷる植物1',
            backgroundColor: 'rgba(60, 160, 220, 0.3)',
            borderColor: 'rgba(60, 160, 220, 0.3)',
            data: [
              {
                y: 50,
                t: new Date('2018/03/14 12:00:00')
              },
              {
                y: 40,
                t: new Date('2018/03/15 00:00:00')
              },
              {
                y: 32,
                t: new Date('2018/03/16 12:00:00')
              },
              {
                y: 27,
                t: new Date('2018/03/17 12:00:00')
              }
            ]
          }
        ],
        labels: [
          new Date('2018/03/14 12:00:00'),
          new Date('2018/03/15 00:00:00'),
          new Date('2018/03/16 00:00:00'),
          new Date('2018/03/17 00:00:00'),
          new Date('2018/03/17 12:00:00')
        ]
      },
      {
        scales: {
          xAxes: [
            {
              type: 'time',
              distribution: 'linear',
              ticks: {
                source: 'labels'
              },
              time: {
                unit: 'hour',
                displayFormats: {
                  hour: 'MM/DD HH:mm'
                }
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                max: 100
              }
            }
          ]
        }
      }
    )
  },
  methods: {
    createLabels() {
      const createdAtList = []
      this.plants.forEach(plant => {
        if (plant.records.length) {
          plant.records.forEach(record => {
            createdAtList.push(record.created_at)
          })
        }
      })
    }
  }
}
</script>
