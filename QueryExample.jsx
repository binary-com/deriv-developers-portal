import { useQuery } from 'react-query';

export default function Example() {
    const { isLoading, error, data } = useQuery('repoData', () =>
      fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res =>
        res.json()
      )
    )
  
    if (isLoading) return 'Loading...'
  
    if (error) return 'An error has occurred: ' + error.message
    return (
        <> 
            <h1>{data.description}</h1>
        </>
    ); 
}
