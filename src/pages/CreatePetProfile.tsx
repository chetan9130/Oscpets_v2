import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"

const CreatePetProfile = () => {
    const [matchmaking, setMatchmaking] = useState(false)

    return (
        <div className="min-h-screen bg-sky-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl p-6 space-y-6 shadow-lg">

                <div className="text-center">
                    <h1 className="text-2xl font-bold text-sky-600">🐾 Create Pet Profile</h1>
                    <p className="text-gray-500">Tell us about your pet</p>
                </div>

                {/* Pet Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Pet Name" />

                    <Select>
                        <SelectItem value="dog">Dog</SelectItem>
                        <SelectItem value="cat">Cat</SelectItem>
                    </Select>

                    <Input placeholder="Breed" />

                    <Select>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                    </Select>

                    <Input type="date" />
                </div>

                {/* Health Info */}
                <div>
                    <h2 className="font-semibold text-gray-700">Health Details</h2>
                    <Textarea placeholder="Any health issues (optional)" />
                </div>

                {/* Matchmaking */}
                <div className="flex items-center justify-between">
                    <span className="font-medium">Available for Matchmaking</span>
                    <Switch checked={matchmaking} onCheckedChange={setMatchmaking} />
                </div>

                {/* Scheduling */}
                <div className="space-y-2">
                    <h2 className="font-semibold text-gray-700">Care Scheduling</h2>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" /> Vaccination Reminders
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" /> Grooming Reminders
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" /> Vet Visit Reminders
                    </label>
                </div>

                {/* Upload */}
                <Input type="file" multiple />

                <Button className="w-full bg-sky-600 hover:bg-sky-700">
                    Create Profile
                </Button>

            </Card>
        </div>
    )
}

export default CreatePetProfile
