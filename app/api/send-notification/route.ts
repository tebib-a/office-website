import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { adminEmail, newEmail } = await request.json()

    // Here you would typically use an email service like SendGrid, Mailgun, etc.
    // For now, we'll just log the notification
    console.log(`Notification to ${adminEmail}: New login attempt from ${newEmail}`)

    // In a real implementation, you would send an email like this:
    // await sendEmail({
    //   to: adminEmail,
    //   subject: "New Admin Login Attempt",
    //   text: `Someone with email ${newEmail} is trying to access the admin dashboard. Please verify this email in the admin panel.`,
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending notification:", error)
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 })
  }
}
