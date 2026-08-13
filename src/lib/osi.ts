export type Protocol = { abbr: string; full: string; purpose: string };

export type OsiLayer = {
  n: number;
  name: string;
  role: string;
  pdu: string;
  protocols: Protocol[];
};

export const LAYERS: OsiLayer[] = [
  {
    n: 7,
    name: "Application",
    pdu: "Data",
    role: "Provides network services directly to applications such as accessing and using the meeting service.",
    protocols: [
      { abbr: "DNS", full: "Domain Name System", purpose: "Resolves a domain name to an IP address." },
      { abbr: "HTTPS", full: "Hypertext Transfer Protocol Secure", purpose: "Provides secure application-level communication." },
      { abbr: "STUN", full: "Session Traversal Utilities for NAT", purpose: "Helps discover network address information for real-time communication." },
      { abbr: "TURN", full: "Traversal Using Relays around NAT", purpose: "Relays real-time traffic when direct communication is not possible." },
    ],
  },
  {
    n: 6,
    name: "Presentation",
    pdu: "Data",
    role: "Handles data representation and protection of exchanged information.",
    protocols: [
      { abbr: "TLS", full: "Transport Layer Security", purpose: "Secures application communication through encryption and authentication." },
      { abbr: "DTLS", full: "Datagram Transport Layer Security", purpose: "Provides security for datagram-based communication." },
      { abbr: "SRTP", full: "Secure Real-time Transport Protocol", purpose: "Protects real-time audio/video media." },
    ],
  },
  {
    n: 5,
    name: "Session",
    pdu: "Data",
    role: "Establishes, manages and terminates communication sessions and coordinates session information.",
    protocols: [
      { abbr: "SDP", full: "Session Description Protocol", purpose: "Describes media and session parameters." },
      { abbr: "SIP", full: "Session Initiation Protocol", purpose: "Can establish, modify and terminate communication sessions. Shown here as an academic OSI mapping." },
    ],
  },
  {
    n: 4,
    name: "Transport",
    pdu: "Segment / Datagram",
    role: "Provides end-to-end transport between communicating applications. Real-time media prioritizes low latency.",
    protocols: [
      { abbr: "UDP", full: "User Datagram Protocol", purpose: "Fast, connectionless transport suitable for real-time media." },
      { abbr: "TCP", full: "Transmission Control Protocol", purpose: "Reliable, ordered and error-controlled transport." },
    ],
  },
  {
    n: 3,
    name: "Network",
    pdu: "Packet",
    role: "Provides logical addressing and routing between networks.",
    protocols: [
      { abbr: "IPv4", full: "Internet Protocol Version 4", purpose: "Provides logical addressing and packet routing." },
      { abbr: "IPv6", full: "Internet Protocol Version 6", purpose: "Provides addressing and routing using IPv6." },
      { abbr: "ICMP", full: "Internet Control Message Protocol", purpose: "Carries network control and diagnostic messages." },
    ],
  },
  {
    n: 2,
    name: "Data Link",
    pdu: "Frame",
    role: "Provides node-to-node delivery and framing across the current network link.",
    protocols: [
      { abbr: "ARP", full: "Address Resolution Protocol", purpose: "Maps IPv4 addresses to MAC addresses on a local network." },
      { abbr: "PPP", full: "Point-to-Point Protocol", purpose: "Provides data-link communication over point-to-point links." },
      { abbr: "HDLC", full: "High-Level Data Link Control", purpose: "Provides framing and controlled data-link communication." },
    ],
  },
  {
    n: 1,
    name: "Physical",
    pdu: "Bits",
    role: "Transmits raw bits as physical signals through the communication medium.",
    protocols: [
      { abbr: "Physical Transmission", full: "Electrical / optical / radio signalling", purpose: "Represents transmission through electrical, optical or radio signals." },
    ],
  },
];

export const layer = (n: number) => LAYERS.find((l) => l.n === n)!;

export type Phase = "sender" | "network" | "receiver";

/** Nodes of the conceptual network path. */
export const NODES = [
  { id: "devA", label: "User A Device", kind: "device" },
  { id: "routerA", label: "Local / Wi-Fi Router", kind: "router" },
  { id: "ispA", label: "ISP Router", kind: "node" },
  { id: "netA", label: "Internet", kind: "cloud" },
  { id: "meet", label: "Google Meet Infrastructure", kind: "server" },
  { id: "netB", label: "Internet", kind: "cloud" },
  { id: "ispB", label: "ISP Router", kind: "node" },
  { id: "routerB", label: "Local / Wi-Fi Router", kind: "router" },
  { id: "devB", label: "User B Device", kind: "device" },
] as const;

export type NodeId = (typeof NODES)[number]["id"];

/** Encapsulation stages of the travelling payload. */
export type PacketStage = "none" | "video" | "udp" | "ip" | "frame" | "bits";

export type Step = {
  n: number;
  title: string;
  phase: Phase;
  layer: number | null;
  /** extra layers lit up during the combined receiver step */
  subLayers?: number[];
  what: string;
  visual: string;
  packet: PacketStage;
  node?: NodeId;
  meet: "create" | "link" | "joining" | "secure" | "session" | "media" | "sending" | "transit" | "received";
};

export const STEPS: Step[] = [
  {
    n: 1,
    title: "Create meeting",
    phase: "sender",
    layer: 7,
    what: "User A opens Google Meet and creates a meeting. The application layer requests the meeting service over the network.",
    visual: "Create a meeting",
    packet: "none",
    node: "devA",
    meet: "create",
  },
  {
    n: 2,
    title: "Meeting link generated",
    phase: "sender",
    layer: 7,
    what: "The service returns a meeting identifier. The name meet.google.com is resolved to an IP address before any media can flow.",
    visual: "meet.google.com/abc-defg-hij",
    packet: "none",
    node: "devA",
    meet: "link",
  },
  {
    n: 3,
    title: "User B joins",
    phase: "sender",
    layer: 7,
    what: "User B opens the meeting link and selects Join. Both endpoints are now known to the meeting service.",
    visual: "User B: Waiting → Joining…",
    packet: "none",
    node: "devB",
    meet: "joining",
  },
  {
    n: 4,
    title: "Secure communication",
    phase: "sender",
    layer: 6,
    what: "A secure channel is negotiated so that media and signalling are encrypted before they are handed to transport.",
    visual: "Secure connection established",
    packet: "none",
    node: "devA",
    meet: "secure",
  },
  {
    n: 5,
    title: "Session establishment",
    phase: "sender",
    layer: 5,
    what: "The media session between the two participants is described and established, agreeing codecs, tracks and roles.",
    visual: "Connecting participants… Session established",
    packet: "none",
    node: "devA",
    meet: "session",
  },
  {
    n: 6,
    title: "Camera + microphone ready",
    phase: "sender",
    layer: 4,
    what: "User A enables camera and microphone. Media is prepared for a low-latency transport stream.",
    visual: "Camera ON · Microphone ON",
    packet: "none",
    node: "devA",
    meet: "media",
  },
  {
    n: 7,
    title: "Video frame captured",
    phase: "sender",
    layer: 4,
    what: "A single video frame is captured and encoded. This frame is the payload we will follow all the way to User B.",
    visual: "Camera → Video Frame",
    packet: "video",
    node: "devA",
    meet: "sending",
  },
  {
    n: 8,
    title: "Transport encapsulation",
    phase: "sender",
    layer: 4,
    what: "The encoded frame is placed inside a datagram. Transport information such as port numbers is added.",
    visual: "Video Data → UDP Datagram",
    packet: "udp",
    node: "devA",
    meet: "sending",
  },
  {
    n: 9,
    title: "IP packet created",
    phase: "sender",
    layer: 3,
    what: "The datagram becomes the payload of an IP packet. Source and destination logical addresses and routing information are associated with it.",
    visual: "UDP Data → IP Packet",
    packet: "ip",
    node: "devA",
    meet: "sending",
  },
  {
    n: 10,
    title: "Data-link frame created",
    phase: "sender",
    layer: 2,
    what: "An IP packet is placed inside a data-link frame for transmission across the current network link.",
    visual: "IP Packet → Data-Link Frame",
    packet: "frame",
    node: "devA",
    meet: "sending",
  },
  {
    n: 11,
    title: "Bits / physical transmission",
    phase: "sender",
    layer: 1,
    what: "The frame is converted into physical signals and transmitted on the medium. Encapsulation is now complete.",
    visual: "Frame → 0101010101…",
    packet: "bits",
    node: "devA",
    meet: "sending",
  },
  {
    n: 12,
    title: "Local router",
    phase: "network",
    layer: null,
    what: "The signals leave User A's device over Wi-Fi and reach the local router, which forwards the packet towards the internet.",
    visual: "User A Device → Local Router",
    packet: "bits",
    node: "routerA",
    meet: "transit",
  },
  {
    n: 13,
    title: "ISP / network routing",
    phase: "network",
    layer: null,
    what: "The packet is routed hop by hop through the ISP and intermediate network routers. Each hop re-frames the packet for its own link.",
    visual: "Local Router → ISP Router → Network Router",
    packet: "bits",
    node: "ispA",
    meet: "transit",
  },
  {
    n: 14,
    title: "Internet / Google Meet infrastructure",
    phase: "network",
    layer: null,
    what: "The packet crosses the internet, passes through the meeting infrastructure that relays media between participants, and continues towards User B's network.",
    visual: "Internet → Meet Infrastructure → Internet",
    packet: "bits",
    node: "meet",
    meet: "transit",
  },
  {
    n: 15,
    title: "Physical layer receives bits",
    phase: "receiver",
    layer: 1,
    what: "Signals arrive at User B's device and are recovered as a stream of bits. Decapsulation begins.",
    visual: "0101010101… → Bits received",
    packet: "bits",
    node: "devB",
    meet: "transit",
  },
  {
    n: 16,
    title: "Data-link frame processed",
    phase: "receiver",
    layer: 2,
    what: "The bits are assembled into a frame, the frame is checked, and the network packet is extracted from it.",
    visual: "Bits → Frame → IP Packet",
    packet: "frame",
    node: "devB",
    meet: "transit",
  },
  {
    n: 17,
    title: "IP packet processed",
    phase: "receiver",
    layer: 3,
    what: "The destination address is confirmed as this host and the datagram inside the IP packet is passed upward.",
    visual: "IP Packet → UDP Data",
    packet: "ip",
    node: "devB",
    meet: "transit",
  },
  {
    n: 18,
    title: "Transport → Session → Presentation",
    phase: "receiver",
    layer: 4,
    subLayers: [5, 6],
    what: "Transport delivers the datagram to the meeting application's media stream, the session layer places it in the correct participant session, and the presentation layer decrypts and decodes the frame.",
    visual: "L4 → L5 → L6",
    packet: "udp",
    node: "devB",
    meet: "transit",
  },
  {
    n: 19,
    title: "Application receives + displays video",
    phase: "receiver",
    layer: 7,
    what: "The decoded video frame reaches the Google Meet application and is rendered in User B's video tile. Decapsulation is complete.",
    visual: "Video Frame → Displayed",
    packet: "video",
    node: "devB",
    meet: "received",
  },
];

export const PHASE_LABEL: Record<Phase, string> = {
  sender: "Encapsulation — Sender",
  network: "Network Transmission",
  receiver: "Decapsulation — Receiver",
};

export const PACKET_LABEL: Record<Exclude<PacketStage, "none">, string> = {
  video: "Video Frame",
  udp: "UDP Data",
  ip: "IP Packet",
  frame: "Data-Link Frame",
  bits: "Bits",
};