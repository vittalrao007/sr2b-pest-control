export function formatWhatsAppUrl(phoneNumber: string, message: string): string {
  // Clean phone number: remove all non-digits, plus signs, dashes, spaces
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  if (!cleanNumber) return '';
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

export function getServiceWhatsAppMessage(businessName: string, serviceName?: string): string {
  if (serviceName) {
    return `Hello ${businessName}, I would like to know more about your ${serviceName} service and request an inspection quote. Please contact me.`;
  }
  return `Hello ${businessName}, I would like to request a quotation for pest control services. Please contact me.`;
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/\s+/g, ' ').trim();
}

export function getTelLink(phone: string): string {
  const clean = phone.replace(/[^\d+]/g, '');
  return `tel:${clean}`;
}

export function formatQuoteEnquiryWhatsAppMessage(details: {
  fullName: string;
  phone: string;
  email?: string;
  location: string;
  propertyType: string;
  pestProblem: string;
  preferredDate?: string;
  preferredTime?: string;
  description?: string;
  enquiryId?: string;
}): string {
  const lines = [
    `*NEW PEST CONTROL QUOTE REQUEST*`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `*Customer Name:* ${details.fullName}`,
    `*Phone Number:* ${details.phone}`,
    details.email ? `*Email:* ${details.email}` : null,
    `*Location / City:* ${details.location}`,
    `*Property Type:* ${details.propertyType}`,
    `*Pest Problem:* ${details.pestProblem}`,
    details.preferredDate ? `*Preferred Date:* ${details.preferredDate}` : null,
    details.preferredTime ? `*Preferred Slot:* ${details.preferredTime}` : null,
    details.description ? `*Problem Description:* ${details.description}` : null,
    details.enquiryId ? `*Ref ID:* ${details.enquiryId}` : null,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `Please provide a quotation & schedule an inspection.`,
  ].filter(Boolean);

  return lines.join('\n');
}
