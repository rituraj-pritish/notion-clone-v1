import React, { useEffect } from 'react';

const Page = () => {
	return (
		<div>
      
		</div>
	);
};

export default Page;

export async function getServerSideProps (ctx) {
	console.log('ct', ctx.req.cookies.auth_token);

	return {
		props: {}
	};
}
