const parseEnv = () => {
  // Filter environment variables starting with the RSS_ prefix
  const rssEnvVars = Object.fromEntries(
    Object.entries(process.env).filter(([key, value]) => key.startsWith('RSS_'))
  );

  // Map the filtered environment variables to the desired format
  const formattedEnvVars = Object.entries(rssEnvVars).map(([key, value]) => `${key}=${value}`);

  // Join the formatted environment variables into a single string
  const envVarsString = formattedEnvVars.join('; ');

  console.log(envVarsString);
};

parseEnv();