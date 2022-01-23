import { StyledSpinner } from './Spinner.styles'

interface Props {
	size?: 'small' | 'medium' | 'large'
	spinning?: boolean
}

const Spinner = ({ size = 'small', spinning }: Props) => {
	if (typeof spinning === 'boolean' && !spinning) return null

	return <StyledSpinner size={size} />
}

export default Spinner
