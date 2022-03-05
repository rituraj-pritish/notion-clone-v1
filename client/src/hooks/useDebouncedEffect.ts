import { DependencyList, EffectCallback, useEffect } from 'react'

export const useDebouncedEffect = (
	effect: EffectCallback,
	deps: DependencyList,
	delay: number
) => {
	useEffect(() => {
		const handler = setTimeout(() => effect(), delay)

		return () => clearTimeout(handler)
		// eslint-disable-next-line
	}, [...(deps || []), delay])
}
