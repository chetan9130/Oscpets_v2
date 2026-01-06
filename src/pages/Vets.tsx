import { useEffect, useState } from "react";
import axios from "axios";
import {
  Check,
  Calendar,
  Clock,
  FileText,
  CreditCard,
  ChevronRight,
  ChevronLeft,
  User,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns"; 

import Header from "@/components/Header";

const API = "http://127.0.0.1:3001";

/* ---------- TIME SLOTS ---------- */
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour < 18; hour++) {
    for (let minute of [0, 30]) {
      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      slots.push({ time, isAvailable: Math.random() > 0.3 });
    }
  }
  return slots;
};

export default function BookTherapist() {
  const [currentStep, setCurrentStep] = useState(1);
  const [therapists, setTherapists] = useState<any[]>([]);
  const [selectedTherapist, setSelectedTherapist] = useState<any | null>(null);
  const [selectedAppointmentType, setSelectedAppointmentType] = useState<any>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(true);

  const [intakeForm, setIntakeForm] = useState({
    reason: "",
    previousTherapy: "",
    medications: "",
    concerns: "",
  });

  const [consentGiven, setConsentGiven] = useState(false);

  /* ---------- STEPS ---------- */
  const steps = [
    { number: 1, title: "Select Vet", icon: User },
    { number: 2, title: "Appointment Type", icon: Video },
    { number: 3, title: "Date & Time", icon: Calendar },
    { number: 4, title: "Intake Form", icon: FileText },
    { number: 5, title: "Payment", icon: CreditCard },
  ];

  /* ---------- FETCH VETS ---------- */
  useEffect(() => {
    axios
      .get(`${API}/vets`)
      .then((res) => setTherapists(res.data))
      .catch(() =>
        toast({
          title: "Failed to load veterinarians",
          variant: "destructive",
        })
      )
      .finally(() => setLoading(false));
  }, []);

  /* ---------- MAP VET ---------- */
  const mapVet = (vet: any) => ({
    id: vet._id,
    name: `Dr. ${vet.name}`,
    image: `${API}/${vet.photo}`,
    experience: vet.experience,
    specialties: vet.specialties || ["General Care"],
    languages: vet.languages || ["English"],
    rating: vet.rating || 4.5,
    reviews: vet.reviews || 50,
    appointmentTypes: [
      {
        id: 1,
        name: "Initial Consultation",
        duration: 60,
        price: 1500,
        description: "First-time consultation",
      },
      {
        id: 2,
        name: "Follow-up Session",
        duration: 45,
        price: 1200,
        description: "Regular follow-up",
      },
    ],
  });

  const timeSlots = generateTimeSlots();

  /* ---------- NAVIGATION ---------- */
  const handleNext = () => {
    if (currentStep === 1 && !selectedTherapist) {
      toast({ title: "Select a vet", variant: "destructive" });
      return;
    }
    if (currentStep === 2 && !selectedAppointmentType) {
      toast({ title: "Select appointment type", variant: "destructive" });
      return;
    }
    if (currentStep === 3 && (!selectedDate || !selectedTime)) {
      toast({ title: "Select date & time", variant: "destructive" });
      return;
    }
    if (currentStep === 4 && !consentGiven) {
      toast({ title: "Consent required", variant: "destructive" });
      return;
    }
    if (currentStep === 5) {
      handleBooking();
      return;
    }
    setCurrentStep((p) => p + 1);
  };

  const handleBack = () => setCurrentStep((p) => p - 1);

  /* ---------- BOOK APPOINTMENT ---------- */
  const handleBooking = async () => {
    try {
      await axios.post(`${API}/appointments`, {
        vetId: selectedTherapist.id,
        appointmentType: selectedAppointmentType.name,
        date: selectedDate,
        time: selectedTime,
        intakeForm,
        amount: selectedAppointmentType.price,
      });

      toast({
        title: "Booking Confirmed!",
        description: `Appointment with ${selectedTherapist.name} booked`,
      });
    } catch {
      toast({ title: "Booking failed", variant: "destructive" });
    }
  };

  return (
     

    <div className="min-h-screen py-12">
      <Header /> <br /><br /><br />
      <div className="container mx-auto max-w-6xl">

        {/* ---------- STEPS ---------- */}
        <div className="flex mb-10">
          {steps.map((step, i) => (
            <div key={i} className="flex-1 text-center">
              <div
                className={`mx-auto w-10 h-10 flex items-center justify-center rounded-full border ${
                  currentStep >= step.number
                    ? "bg-primary text-white"
                    : "text-muted-foreground"
                }`}
              >
                {currentStep > step.number ? (
                  <Check size={18} />
                ) : (
                  <step.icon size={18} />
                )}
              </div>
              <p className="text-xs mt-2">{step.title}</p>
            </div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
          </CardHeader>
          <CardContent>

            {/* ---------- STEP 1 ---------- */}
            {currentStep === 1 && (
              <div className="space-y-4">
                {loading && <p>Loading vets...</p>}
                {!loading &&
                  therapists.map((vet) => {
                    const t = mapVet(vet);
                    return (
                      <Card
                        key={t.id}
                        className={`cursor-pointer ${
                          selectedTherapist?.id === t.id
                            ? "ring-2 ring-primary"
                            : ""
                        }`}
                        onClick={() => setSelectedTherapist(t)}
                      >
                        <CardContent className="flex gap-4 p-4">
                          <img
                            src={t.image}
                            className="w-20 h-20 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold">{t.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {t.experience} yrs experience
                            </p>
                            <div className="flex gap-2 mt-2">
                              {t.specialties.map((s: string) => (
                                <Badge key={s}>{s}</Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            )}

            {/* ---------- STEP 2 ---------- */}
            {currentStep === 2 && selectedTherapist && (
              <RadioGroup>
                {selectedTherapist.appointmentTypes.map((type: any) => (
                  <Card
                    key={type.id}
                    onClick={() => setSelectedAppointmentType(type)}
                    className={`cursor-pointer mb-4 ${
                      selectedAppointmentType?.id === type.id
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                  >
                    <CardContent className="flex justify-between p-4">
                      <div>
                        <Label>{type.name}</Label>
                        <p className="text-sm">{type.description}</p>
                        <p className="text-xs">
                          <Clock size={12} /> {type.duration} mins
                        </p>
                      </div>
                      <p className="font-bold text-primary">₹{type.price}</p>
                    </CardContent>
                  </Card>
                ))}
              </RadioGroup>
            )}

            {/* ---------- STEP 3 ---------- */}
            {currentStep === 3 && (
              <div className="grid md:grid-cols-2 gap-6">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(d) => d < new Date()}
                />
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      disabled={!slot.isAvailable}
                      variant={
                        selectedTime === slot.time ? "default" : "outline"
                      }
                      onClick={() => setSelectedTime(slot.time)}
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* ---------- STEP 4 ---------- */}
            {currentStep === 4 && (
              <>
                <Textarea
                  placeholder="Reason for appointment"
                  onChange={(e) =>
                    setIntakeForm({ ...intakeForm, reason: e.target.value })
                  }
                />
                <div className="flex gap-2 mt-4">
                  <Checkbox
                    checked={consentGiven}
                    onCheckedChange={(v) => setConsentGiven(v as boolean)}
                  />
                  <Label>I consent to share my information</Label>
                </div>
              </>
            )}

            {/* ---------- STEP 5 ---------- */}
            {currentStep === 5 && selectedAppointmentType && (
              <div className="space-y-3">
                <p>
                  <strong>Vet:</strong> {selectedTherapist.name}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {selectedDate && format(selectedDate, "PP")} at{" "}
                  {selectedTime}
                </p>
                <p className="text-xl font-bold text-primary">
                  ₹{selectedAppointmentType.price}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ---------- NAV ---------- */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            disabled={currentStep === 1}
            onClick={handleBack}
          >
            <ChevronLeft size={16} /> Back
          </Button>
          <Button onClick={handleNext}>
            {currentStep === 5 ? "Confirm & Pay" : "Continue"}
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
