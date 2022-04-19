// @ts-ignore
import tw, { styled } from 'twin.macro'
export const SelectedCombo = styled.div`
	min-height: 500px;
	${({ selectedPlan }: any) => selectedPlan && tw`shadow-xl`};
	${tw`flex flex-col w-1/3 mr-10 border rounded-md h-4/5`}
	& {
		cursor: pointer;
	} ;
`
/* 

	<SelectedCombo  // selectedPlan is a state
			selectedPlan={selectedPlan === 'plan1'}>
    </SelectedCombo>
    */
export const Content = styled.div``

export const Line = styled.div`
	${tw`flex w-full px-3 my-2 text-base`}
	height: 25px;
`

export const ErrorHint = styled.div`
	${tw`flex w-full px-3 my-2 text-xs`}
	color: red;
`
