<<<<<<< HEAD
import {
  useGetAppointments,
  useUpdateAppointmentStatus,
} from "@/hooks/use-appointment";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
=======
import { useGetAppointments, useUpdateAppointmentStatus } from "@/hooks/use-appointment";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Calendar } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
>>>>>>> f8fc5ad25f9fa1086ced187059a1e4e6cdd8e6a2
import { Button } from "../ui/button";

function RecentAppointments() {
  const { data: appointments = [] } = useGetAppointments();
  const updateAppointmentMutation = useUpdateAppointmentStatus();

  const handleToggleAppointmentStatus = (appointmentId: string) => {
    const appointment = appointments.find((apt) => apt.id === appointmentId);

<<<<<<< HEAD
    const newStatus =
      appointment?.status === "CONFIRMED" ? "COMPLETED" : "CONFIRMED";
=======
    const newStatus = appointment?.status === "CONFIRMED" ? "COMPLETED" : "CONFIRMED";
>>>>>>> f8fc5ad25f9fa1086ced187059a1e4e6cdd8e6a2

    updateAppointmentMutation.mutate({ id: appointmentId, status: newStatus });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CONFIRMED":
<<<<<<< HEAD
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Confirmed
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Completed
          </Badge>
        );
=======
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Confirmed</Badge>;
      case "COMPLETED":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
>>>>>>> f8fc5ad25f9fa1086ced187059a1e4e6cdd8e6a2
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Recent Appointments
        </CardTitle>
<<<<<<< HEAD
        <CardDescription>
          Monitor and manage all patient appointments
        </CardDescription>
=======
        <CardDescription>Monitor and manage all patient appointments</CardDescription>
>>>>>>> f8fc5ad25f9fa1086ced187059a1e4e6cdd8e6a2
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div>
<<<<<<< HEAD
                      <div className="font-medium">
                        {appointment.patientName}
                      </div>
=======
                      <div className="font-medium">{appointment.patientName}</div>
>>>>>>> f8fc5ad25f9fa1086ced187059a1e4e6cdd8e6a2
                      <div className="text-sm text-muted-foreground">
                        {appointment.patientEmail}
                      </div>
                    </div>
                  </TableCell>
<<<<<<< HEAD
                  <TableCell className="font-medium">
                    {appointment.doctorName}
                  </TableCell>
=======
                  <TableCell className="font-medium">{appointment.doctorName}</TableCell>
>>>>>>> f8fc5ad25f9fa1086ced187059a1e4e6cdd8e6a2
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {new Date(appointment.date).toLocaleDateString()}
                      </div>
<<<<<<< HEAD
                      <div className="text-sm text-muted-foreground">
                        {appointment.time}
                      </div>
=======
                      <div className="text-sm text-muted-foreground">{appointment.time}</div>
>>>>>>> f8fc5ad25f9fa1086ced187059a1e4e6cdd8e6a2
                    </div>
                  </TableCell>
                  <TableCell>{appointment.reason}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
<<<<<<< HEAD
                      onClick={() =>
                        handleToggleAppointmentStatus(appointment.id)
                      }
=======
                      onClick={() => handleToggleAppointmentStatus(appointment.id)}
>>>>>>> f8fc5ad25f9fa1086ced187059a1e4e6cdd8e6a2
                      className="h-6 px-2"
                    >
                      {getStatusBadge(appointment.status)}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
<<<<<<< HEAD
                    <div className="text-xs text-muted-foreground">
                      Click status to toggle
                    </div>
=======
                    <div className="text-xs text-muted-foreground">Click status to toggle</div>
>>>>>>> f8fc5ad25f9fa1086ced187059a1e4e6cdd8e6a2
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default RecentAppointments;
