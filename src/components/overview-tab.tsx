import { DataTabProps } from '@/types/types'
import React from 'react'

function OverviewTab({ props }: { props: DataTabProps }) {
    return (
        <div className="min-h-[100vh] p-2">
            {JSON.stringify(props)}
        </div>
    )
}

export default OverviewTab