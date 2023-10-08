// EXTERNALS
import axios, { AxiosResponse } from 'axios';
import { Query, QueryKey, UseQueryResult } from 'react-query';
import { useAccount, useQuery } from 'wagmi';




export function useGraphQLQuery<T>(query: string, variables: object,organisation:string,name:string) {

    const url = `https://api.thegraph.com/subgraphs/name/${organisation}/${name}`; // Replace with your GraphQL endpoint

    return useQuery<T, undefined>([query], {
        queryFn: async () => {
            try {
                const response = await axios.post<T, AxiosResponse<T>>(url, {
                    query,
                    variables,
                });

                return response.data;
            } catch (error: any) {
                throw new Error(`GraphQL query error: ${error.message}`);
            }
        },
    });
}

interface DomainData {
    domjain: {
        subdomainCount: number;
        subdomains: {
            id: string;
            labelName: string;
            labelhash: string;
            isMigrated: boolean;
            name: string;
            subdomainCount: number;
            createdAt: string;
            owner: {
                id: string;
            };
            wrappedDomain: {
                fuses: string;
                expiryDate: string;
                owner: {
                    id: string;
                };
            };
        }[];
    }
}


interface DomainData {
    domain: {
        subdomainCount: number;
        subdomains: {
            id: string;
            labelName: string;
            labelhash: string;
            isMigrated: boolean;
            name: string;
            subdomainCount: number;
            createdAt: string;
            owner: {
                id: string;
            };
            wrappedDomain: {
                fuses: string;
                expiryDate: string;
                owner: {
                    id: string;
                };
            };
        }[];
    }
}


// Example usage:
function ensQuery() {
    const { address } = useAccount();
    const queryString = `
        query {
            domain(id: "0xff80549f7f8ef9565a07d5657fda714ccd00d7b496aeaafd3043b011d95bcee5") {
              subdomainCount
              subdomains(first: 25, orderBy: "createdAt", orderDirection: "desc") {
                id
                labelName
                labelhash
                isMigrated
                name
                subdomainCount
                createdAt
                owner {
                  id
                }
                wrappedDomain {
                  fuses
                  expiryDate
                  owner {
                    id
                  }
                }
              }
            }
          }
  `;

  return {queryString,  address};

}
export type {DomainData}
export default ensQuery;
