import Page404 from '@d/pages/404';
import Document from '@d/layouts/document';
import Home from '@d/pages/home';

export default [
	{
		path: '/',
		element: <Home />
	},
	{
		path: '/docs/:name',
		element: <Document />,
		errorElement: <>error</>
	},
	{
		path: '/*',
		element: <Page404 />
	}
];