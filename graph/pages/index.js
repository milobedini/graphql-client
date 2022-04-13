import { makeStyles } from '@mui/styles'
import Header from '../components/Header'

const useStyles = makeStyles((theme) => ({
  example: {
    color: 'black',
  },
}))

export default function Home() {
  const classes = useStyles()
  return (
    <>
      <Header />
      <div className={classes.example}>Hello</div>
    </>
  )
}
