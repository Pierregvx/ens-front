import { NextSeo } from 'next-seo'
import { Box, Typography } from '@mui/material';
import { Container, Layout } from '@/components/templates'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ensQuery, { DomainData, useGraphQLQuery } from '@/hooks/ensDetails'
import { Button } from '@ensdomains/thorin';
const style = {
  width: '100%',
  maxWidth: 560,
  bgcolor: 'background.paper',
};
export default function Page() {
  const { queryString, address } = ensQuery()
  let { data } = useGraphQLQuery<{ data: DomainData }>(queryString, { address }, "ensdomains", "ensgoerli")
  const domain = data?.data?.domain
  let { data: sub } = useGraphQLQuery<{ data: DomainData }>(queryString, { address }, "pierregvx", "test")

  return (
    <>
      <NextSeo title="Menu" />

      <Layout>
        <header style={{ marginBottom: '20px' }} />

        <Container as="main" $variant="flexVerticalCenter" style={{ marginBottom: '20px' }}>
          {/* Content inside the container */}
        </Container>

        <h1 style={{ marginBottom: '20px' }}>Domains available:</h1>

        <List sx={style} component="nav" aria-label="mailbox folders">
          {domain?.subdomains.map((subdomain: any) => (
            <ListItem key={subdomain.id} style={{ marginBottom: '15px' }}>
              <div>
                name: {subdomain.name} <br />
                owner : {subdomain.owner.id} <br />
              </div>

              {subdomain.name == "secondone.romanempire.eth" && (
                <Box mt={10}  >
                  <Typography variant="body1">Request</Typography>
                  <Typography variant="body1">State : CREATED</Typography>
                  <Typography variant="body1">Description : do some code or something</Typography>
                  <Button>Accept</Button>
                </Box>
              )}
            </ListItem>
          ))}
        </List>

        <footer style={{ marginTop: '20px' }} />
      </Layout>
    </>
  )
}




