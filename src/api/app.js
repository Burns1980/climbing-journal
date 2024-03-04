const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Importing route modules
const areaRoutes = require('./routes/area');
const projectRoutes = require('./routes/project');
const routeRoutes = require('./routes/route');
const tripReportRoutes = require('./routes/trip-report');

// Using routes
app.use('/area', areaRoutes);
app.use('/project', projectRoutes);
app.use('/route', routeRoutes);
app.use('/trip-report', tripReportRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
