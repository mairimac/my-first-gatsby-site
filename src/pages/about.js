// Step 1: Import React
import * as React from 'react'
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'

// Step 2: Define your component

class AboutPage extends React.PureComponent {
  state = {
    loading:true,
    error: false,
    fetchedData: []
  }


componentDidMount() {
  const API_KEY = API_KEY

  fetch('http://api.football-data.org/v2/competitions/2021/matches?matchday=26', {
    method: 'get',
    headers: new Headers ({
      'X-Auth-Token': API_KEY
    })
  }).then(response => {
    return response.json()
  }).then(json => {
    console.log(json)

    this.setState({
      fetchedData: json.matches,
      loading: false
    }) 
  })

}
render() {

  const {loading, fetchedData} = this.state
 
  return (
     <Layout pageTitle="Fixtures">
       <StaticImage
        alt="English Premier League Lion logo"
        src="..\images\Premier_League_Logo.svg.png"
      />
        <p>Results and fixtures grabbed from api.football-data.org</p>
       {fetchedData.map(fixtures => (
         
         <p key={fixtures.homeTeam.name}><tr><td>
          <img src={`https://crests.football-data.org/${fixtures.homeTeam.id}.svg`} width="20" height="20" alt="team crest"></img> </td><td>
           {fixtures.homeTeam.name} {fixtures.score.fullTime.homeTeam}</td><td>v</td>
           <td>
          <img src={`https://crests.football-data.org/${fixtures.awayTeam.id}.svg`} width="20" height="20" alt="team crest"></img></td><td> {fixtures.awayTeam.name} {fixtures.score.fullTime.awayTeam}/ {fixtures.status}
          </td></tr></p> ))
           
          } 

    </Layout>
  )
  
}

}
/* const AboutPage = () => {
  return (
    <Layout pageTitle="About Me">
      <p>Hi there! I'm the proud creator of this site, which I built with Gatsby.</p>
    </Layout>

  )
} */

// Step 3: Export your component
export default AboutPage