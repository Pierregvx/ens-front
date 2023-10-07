import { NextSeo } from 'next-seo'

import { Container, Layout } from '@/components/templates'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import yourQuery, { DomainData, useGraphQLQuery } from '@/hooks/ensDetails'
const style = {
  width: '100%',
  maxWidth: 560,
  bgcolor: 'background.paper',
};
export default function Page() {
  const {queryString,address} = yourQuery()
  let {data}=useGraphQLQuery<{data:DomainData}>(queryString, { address })
  const domain = data?.data?.domain
  console.log(domain)
  return (
    <>
      <NextSeo title="Menu" />

      <Layout>
        <header />

        <Container as="main" $variant="flexVerticalCenter">
          

        </Container>
          <h1> Domains available :</h1>
          <List sx={style} component="nav" aria-label="mailbox folders">
          {domain?.subdomains.map((subdomain: any) => (
            <ListItem key={subdomain.id}>
              name: {subdomain.name} <br />
              owner : {subdomain.owner.id} <br />
            </ListItem>
          ))
          }
          </List>
        <footer />
      </Layout>
    </>
  )
}

      

