import { Container, Box, Heading } from '@chakra-ui/react'

const Page = () => {
  return (
    <Container>
      <Box borderRadius="lg" bg="red" mb={6} p={3} align="center">
        Warning: Entering Construction Zone.
      </Box>
      <Box display={{md:'flex'}}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Alexei Ozerov  
          </Heading>
          <p>Trumpeter, Composer, Arranger, Developer</p>
        </Box>
      </Box>
    </Container>
  )
}

export default Page
