import App from './app';

const PORT = 3001;

const app = new App().app;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
