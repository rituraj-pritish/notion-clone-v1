import NextLink, { LinkProps } from 'next/link'
import React from 'react'

export interface Props extends LinkProps {
	children: React.ReactNode
}

const Link = ({ children, href, ...props }: Props) => {
	return (
		<NextLink href={href}>
			<a {...props}>{children}</a>
		</NextLink>
	)
}

export default Link
