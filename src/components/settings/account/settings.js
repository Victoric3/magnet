import { Box, Container, Stack, Typography } from '@mui/material';
import { SettingsNotifications } from './settingsNotification';
import { SettingsPassword } from './settingsPassword';
import Layout from '../../utilities/layout';

const Settings = () => (
  <>
  <Layout>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h4">
            Settings
          </Typography>
          <SettingsNotifications />
          <SettingsPassword />
        </Stack>
      </Container>
    </Box>
    </Layout>
  </>
);

export default Settings;
