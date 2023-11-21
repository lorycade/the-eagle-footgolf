import { Box, Container, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <>
      <Container maxWidth="xl" sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '600px'
          }}
        >
          <Typography component="h1" variant="h1" fontWeight={'bold'}>404</Typography>
          <Typography component="h1" variant="h3" marginTop={4}>Pagina non trovata</Typography>

          <Link onClick={() => navigate('/')} sx={{mt: 5, color: '#fff', cursor: 'pointer'}}>Torna alla pagina principale</Link>
        </Box>

      </Container>
    </>
  );
};

export default ErrorPage;
