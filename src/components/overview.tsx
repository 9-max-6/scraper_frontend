import { BidType, DataTabProps } from '@/types/types'
import React from 'react'

function Overview({ props }: { props: BidType }) {
    return (
        <div className="min-h-[100vh] p-2">
            {JSON.stringify(props)}
        </div>
    )
}

export default Overview