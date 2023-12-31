import { Button, Card, EnsSVG, Heading, Typography } from '@ensdomains/thorin'
import { NextSeo } from 'next-seo'
import styled, { css } from 'styled-components'

import { Container, Layout } from '@/components/templates'
import { ConnectButton } from '@/components/ConnectButton'

export default function Home() {
  return (
    <>
      <NextSeo title="Home" />

      <Layout>
        {/* Placeholder for the header */}
        <header />

        {/* Main content */}
        <Container as="main" $variant="flexVerticalCenter" $width="large">
          <SvgWrapper>
            <EnsSVG />
          </SvgWrapper>

          <Heading level="1">Welcome to Pizza secreta </Heading>

          <ExamplesGrid>
            <Card title="Profile">
              <Typography color="textSecondary">
              Check your profile & generate a proof of contribution
              </Typography>

              <Button as="a" href="/profilePage">
                View
              </Button>
            </Card>

            <Card title="Page Menu">
              <Typography color="textSecondary">
                Access the dashboard and consult available consultations
              </Typography>

              <Button as="a" href="/menu">
                View
              </Button>
            </Card>
          </ExamplesGrid>
        </Container>

        {/* Placeholder for the footer */}
        <footer />
      </Layout>
    </>
  )
}

const SvgWrapper = styled.div(
  ({ theme }) => css`
    --size: ${theme.space['16']};
    width: var(--size);
    height: var(--size);

    svg {
      width: 100%;
      height: 100%;
    }
  `
)

const ExamplesGrid = styled.div(
  ({ theme }) => css`
    width: 100%;
    display: grid;
    gap: ${theme.space['4']};
    grid-template-columns: repeat(auto-fit, minmax(${theme.space['64']}, 1fr));
  `
)
