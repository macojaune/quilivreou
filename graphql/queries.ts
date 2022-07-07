import {gql} from "@apollo/client";

export const RandomUserQuery = gql`
    query GetRandomUser{
        randomUser{
            username
            email
            password
        }
    }`

export const MeQuery = gql`
    query {
        me{
            username
        }
    }`

export const SitesQuery = gql`
    query GetSiteNames($url: String) {
        sites(filters:{url:{containsi:$url}}) {
            data {
                id
                attributes {
                    title
                    url
                    slug
                }
            }
        }
    }`

export const SiteDataQuery = gql`
    query GetSiteData($url: String) {
        siteData(url:$url){
            title
            url
            images
            domain
            description
        }
    }
`
