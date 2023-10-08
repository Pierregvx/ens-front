import { Button, Card, Input, Spinner } from '@ensdomains/thorin'
import { NextSeo } from 'next-seo'
import { useAccount, useEnsAddress, useEnsName } from 'wagmi'
import { useState } from 'react'

import { Container, Layout } from '@/components/templates'
import useRessource from '@/hooks/useRessource'
import { createProofs } from '@/hooks/semaphore'

export default function Page() {

  const [repositoryOwner, setRepositoryOwner] = useState('')
  const [repositoryName, setRepositoryName] = useState('')

  type contributor = {
    login: string,
    avatar_url: string,
  }

  const { data: contribs, isLoading, isError } = useRessource<contributor[]>(`https://api.github.com/repos/${repositoryOwner}/${repositoryName}/contributors`);
  const contributors = contribs?.map((contributor) => contributor.login)
  const { address } = useAccount()
  const { data: ens } = useEnsName(
    {
      chainId: 5,
      address
    }
  )
  const github = "Pierregvx"
  console.log(contributors)
  return (
    <>
      <NextSeo title="Input" />

      <Layout>
        <header />

        <h1>Profile Page {ens}</h1>
        <p>ENS Name : {address}</p>
        <p>your github : {github}</p>


Prove that you contributed to a github repository: 
        <Container as="main">
          <Card title="Name/Address Input">
            <Input
              label="Organisation Name"
              placeholder="ethereum"
              onChange={(e) => setRepositoryOwner(e.target.value)}
            />
            <Input
              label="Repository Name"
              placeholder="ethereum-org-website"
              onChange={(e) => setRepositoryName(e.target.value)}
            />

            <Button 
            // disabled={!contributors?.some((contributor) => contributor === github)}
              onClick={() => createProofs(contributors, github).then(e => console.log(e))}
              colorStyle="greenPrimary">
              {
                isLoading ?
                  "loading" :
                    // contributors?.some((contributor) => contributor === github) ?
                      "generate & copy a proof" 
              }

            </Button>
          </Card>
        </Container>

        <footer />
      </Layout >
    </>
  )
}
