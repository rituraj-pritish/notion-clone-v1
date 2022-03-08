import moment from 'moment-timezone'
import React from 'react'

import { Box, Text, Tooltip } from '@/atoms'

const CreatedAndEditedMenuItem = ({ created, lastEdited }) => {
	return (
		<Tooltip
			placement='right'
			overlay={
				<>
					<div>Last edited by {lastEdited.user.name}</div>
					<Tooltip.SubText>
						{moment(lastEdited.time).format('DD/MM/yyyy')}
					</Tooltip.SubText>
					<div>Created by {created.user.name}</div>
					<Tooltip.SubText>
						{moment(created.time).format('DD/MM/yyyy')}
					</Tooltip.SubText>
				</>
			}
		>
			<Box px={3} pt={1}>
				<Text size='small'>Last edited by {lastEdited.user.name}</Text>
				<Text size='small'>
					{moment(lastEdited.time).format('DD/MM/yyyy hh:mm A')}
				</Text>
			</Box>
		</Tooltip>
	)
}

export default CreatedAndEditedMenuItem
