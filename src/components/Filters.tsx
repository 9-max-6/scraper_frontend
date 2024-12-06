import React from 'react'
import { Card, CardContent, CardDescription, CardTitle, CardFooter, CardHeader } from './ui/card'
import { Button } from './ui/button'
import { FilterIcon } from 'lucide-react'
import { Dialog, DialogHeader, DialogContent, DialogDescription, DialogTrigger, DialogTitle } from './ui/dialog'
function Filters() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" className='ml-auto'>
                    <FilterIcon />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>

        </Dialog>

    )
}

export default Filters