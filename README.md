# Meet The Layers

BUILD AN INTERACTIVE COMPUTER NETWORKS LAB SIMULATION — DO NOT MAKE A STATIC DASHBOARD.

PROJECT TITLE:

Google Meet – OSI Model Simulation

PURPOSE:

Create an interactive educational case study showing what happens when User A starts a Google Meet video call with User B, how the video data moves DOWN the 7 OSI layers at the sender, travels through the actual conceptual network components, and then moves UP the 7 OSI layers at the receiver.

The final product must feel like a polished Computer Networks laboratory simulation, NOT like an AI-generated SaaS dashboard.

============================================================

1. CORE CONCEPT

============================================================

The entire application should tell ONE continuous story:

USER A

→ Google Meet

→ OSI Layer 7

→ Layer 6

→ Layer 5

→ Layer 4

→ Layer 3

→ Layer 2

→ Layer 1

→ LOCAL NETWORK

→ ROUTER

→ ISP / NETWORK ROUTERS

→ INTERNET

→ GOOGLE MEET INFRASTRUCTURE

→ INTERNET

→ ISP / NETWORK ROUTERS

→ ROUTER

→ LOCAL NETWORK

→ USER B

→ Layer 1

→ Layer 2

→ Layer 3

→ Layer 4

→ Layer 5

→ Layer 6

→ Layer 7

→ VIDEO DISPLAYED

The OSI model must be the CENTRAL visual concept.

Do NOT make the OSI information an afterthought hidden inside cards.

============================================================

2. LIGHT, CLEAN, HUMAN-DESIGNED UI

============================================================

Use LIGHT MODE ONLY.

The current AI-generated dark dashboard style must NOT be used.

Design direction:

- White / very light gray background

- Dark charcoal/navy text

- Subtle borders

- Soft shadows

- Small/moderate corner radius

- Clean sans-serif typography

- Plenty of whitespace

- Restrained accent colors

- Professional academic/lab-project appearance

Avoid:

- Neon colors

- Glow effects

- Excessive gradients

- Glassmorphism

- Huge rounded cards

- Too many floating cards

- Random decorative icons

- Excessive badges

- Excessive animations

- "AI dashboard" appearance

Think:

"Interactive Computer Networks laboratory simulator"

NOT:

"AI-generated SaaS dashboard"

============================================================

3. MAIN SCREEN STRUCTURE

============================================================

The main screen should have a clear hierarchy.

HEADER:

Google Meet – OSI Model Simulation

Subtitle:

"Follow a video frame from User A's camera to User B's screen through the 7-layer OSI model."

Then the main simulation should contain:

LEFT:

SIMULATION STEPS

CENTER:

GOOGLE MEET VIDEO CONFERENCE + NETWORK JOURNEY

RIGHT:

CURRENT OSI LAYER

Below the main simulation:

ENCAPSULATION / DECAPSULATION VISUALIZATION

Then:

7 OSI LAYERS AT A GLANCE

Then:

FINAL TAKEAWAYS

Do NOT put every piece of information into separate oversized cards.

============================================================

4. SIMULATION MUST HAVE AT LEAST 14 STEPS

============================================================

IMPORTANT:

The previous versions had only around 9–12 meaningful steps.

That is NOT sufficient.

The reference case study had a much more detailed state-by-state simulation, including sender processing, network movement, receiver processing and final delivery. The original implementation used a long state sequence extending through the receiver and final delivery. 

Our simulation should therefore have AT LEAST 14 meaningful steps.

PREFERRED:

Use 19 meaningful simulation states/steps if the implementation can support it cleanly.

Do NOT artificially create meaningless steps just to increase the number.

Each step must represent a real event in the video-conferencing journey.

============================================================

5. RECOMMENDED 19-STEP FLOW

============================================================

Use this detailed sequence.

-------------------------

PHASE A — APPLICATION / CALL SETUP

-------------------------

STEP 1 — CREATE MEETING

User A opens Google Meet and creates a meeting.

Visual:

Google Meet-like interface

"Create a meeting"

"Meeting link generated"

Layer:

L7 — Application

-------------------------

STEP 2 — MEETING LINK GENERATED

Show:

meet.google.com/abc-defg-hij

User A copies/shares the meeting link.

Layer:

L7 — Application

-------------------------

STEP 3 — USER B JOINS

User B opens the meeting link and selects "Join".

Visual:

User B changes from "Waiting" to "Joining..."

Layer:

L7 — Application

-------------------------

STEP 4 — SECURE COMMUNICATION

Show a secure connection being established.

Visual:

Lock icon

"Secure connection established"

Layer:

L6 — Presentation

-------------------------

STEP 5 — SESSION ESTABLISHMENT

Show the communication/media session being established.

Visual:

"Connecting participants..."

"Session established"

Layer:

L5 — Session

-------------------------

STEP 6 — CAMERA + MICROPHONE READY

User A enables:

Camera ON

Microphone ON

Show a realistic webcam-style video image.

Layer:

L4 — Transport / media preparation

-------------------------

STEP 7 — VIDEO FRAME CAPTURED

Show:

Camera

↓

Video Frame

The video frame should become a clearly identifiable object/packet.

Layer:

L4 — Transport

-------------------------

STEP 8 — TRANSPORT ENCAPSULATION

Show:

Video Data

↓

UDP Datagram / Transport Data

Visualize the transport information being added.

Layer:

L4 — Transport

-------------------------

STEP 9 — IP PACKET CREATED

Show:

UDP Data

↓

IP Packet

Explain that IP addressing and routing information are associated with the packet.

Layer:

L3 — Network

-------------------------

STEP 10 — DATA-LINK FRAME CREATED

Show:

IP Packet

↓

Data-Link Frame

Explain framing for the current network link.

Layer:

L2 — Data Link

-------------------------

STEP 11 — BITS / PHYSICAL TRANSMISSION

Show:

Frame

↓

010101010101...

Visualize the data becoming physical signals/bits.

Layer:

L1 — Physical

At this point:

ENCAPSULATION COMPLETE

-------------------------

PHASE B — NETWORK TRANSMISSION

-------------------------

STEP 12 — LOCAL ROUTER

The packet leaves User A's device and reaches the local router.

Show:

User A Device

→ Wi-Fi / Local Router

Highlight the router.

-------------------------

STEP 13 — ISP / NETWORK ROUTING

Show the packet moving through one or more conceptual ISP/network routers.

Use:

Local Router

→ ISP Router

→ Network Router

The packet should visibly move.

-------------------------

STEP 14 — INTERNET / GOOGLE MEET INFRASTRUCTURE

Show:

🌐 Internet

→ Google Meet Infrastructure / Edge Server

→ 🌐 Internet

The packet should visibly pass through the central infrastructure.

Do NOT claim this is the exact internal architecture of Google Meet.

Label it:

"Conceptual network path for this OSI case study"

-------------------------

PHASE C — RECEIVER / DECAPSULATION

-------------------------

STEP 15 — PHYSICAL LAYER RECEIVES BITS

The bits arrive at User B's device.

Layer:

L1 — Physical

-------------------------

STEP 16 — DATA-LINK FRAME PROCESSED

Bits are processed into a frame and the network packet is extracted.

Layer:

L2 — Data Link

-------------------------

STEP 17 — IP PACKET PROCESSED

The IP packet is processed and passed upward.

Layer:

L3 — Network

-------------------------

STEP 18 — TRANSPORT / SESSION / PRESENTATION PROCESSING

This step should visually show the data moving upward through:

L4 — Transport

L5 — Session

L6 — Presentation

Do NOT hide these layers.

Show a clear animated progression:

L4 → L5 → L6

If the UI supports separate substeps, make them visible.

-------------------------

STEP 19 — APPLICATION RECEIVES + DISPLAYS VIDEO

The video frame reaches the Google Meet application.

User B's video tile changes from:

"Waiting for video..."

to:

VIDEO DISPLAYED

Show the same video visual that originated from User A.

Final state:

✓ Video frame successfully delivered

✓ Video displayed at User B

============================================================

6. IMPORTANT: 7 OSI LAYERS MUST ALWAYS BE VISIBLE

============================================================

Create TWO permanent OSI stacks.

LEFT:

USER A — SENDER

7 APPLICATION

6 PRESENTATION

5 SESSION

4 TRANSPORT

3 NETWORK

2 DATA LINK

1 PHYSICAL

RIGHT:

USER B — RECEIVER

7 APPLICATION

6 PRESENTATION

5 SESSION

4 TRANSPORT

3 NETWORK

2 DATA LINK

1 PHYSICAL

These must look like actual stacked layers.

NOT just a list of text.

For every simulation step:

- Current layer = highlighted

- Completed layers = subtle completed state

- Future layers = muted

- Current layer has a clear active indicator

Sender progression:

L7

↓

L6

↓

L5

↓

L4

↓

L3

↓

L2

↓

L1

Receiver progression:

L1

↓

L2

↓

L3

↓

L4

↓

L5

↓

L6

↓

L7

This is essential for the case study.

============================================================

7. CURRENT STEP / CURRENT LAYER PANEL

============================================================

The right side should always clearly show:

STEP 10 OF 19

SENDER — ENCAPSULATION

LAYER 2

DATA LINK

WHAT IS HAPPENING?

"An IP packet is placed inside a data-link frame for transmission across the current network link."

PROTOCOLS

ARP

Address Resolution Protocol

"Maps an IPv4 address to a MAC address on a local network."

PPP

Point-to-Point Protocol

"Provides data-link communication over a point-to-point connection."

HDLC

High-Level Data Link Control

"Provides framing and controlled communication over a data link."

The panel must be readable.

Do not permanently show huge amounts of text at the bottom of the page.

============================================================

8. LAYER INFORMATION POPUP

============================================================

When a user clicks the current OSI layer, open a clean information popup/modal.

It should contain:

LAYER NUMBER

LAYER NAME

1–2 line explanation of the layer

Then:

PROTOCOLS

For each protocol:

Protocol Name

Full Form

One-line purpose/use

Example:

LAYER 4 — TRANSPORT

"Provides end-to-end transport between communicating applications. Real-time media prioritizes low latency."

UDP

User Datagram Protocol

"Provides fast, low-latency transport suitable for real-time audio and video."

TCP

Transmission Control Protocol

"Provides reliable, ordered and error-controlled delivery."

The popup should be educational and readable.

============================================================

9. LAYER CONTENT

============================================================

Use concise, technically responsible content.

L7 — APPLICATION

Role:

"Provides network services directly to applications such as accessing and using the meeting service."

Protocols:

DNS — Domain Name System

"Resolves a domain name to an IP address."

HTTPS — Hypertext Transfer Protocol Secure

"Provides secure application-level communication."

STUN — Session Traversal Utilities for NAT

"Helps discover network address information for real-time communication."

TURN — Traversal Using Relays around NAT

"Relays real-time traffic when direct communication is not possible."

L6 — PRESENTATION

Role:

"Handles data representation and protection of exchanged information."

TLS — Transport Layer Security

"Secures application communication through encryption and authentication."

DTLS — Datagram Transport Layer Security

"Provides security for datagram-based communication."

SRTP — Secure Real-time Transport Protocol

"Protects real-time audio/video media."

L5 — SESSION

Role:

"Establishes, manages and terminates communication sessions and coordinates session information."

SDP — Session Description Protocol

"Describes media and session parameters."

SIP — Session Initiation Protocol

"Can establish, modify and terminate communication sessions."

IMPORTANT:

Present SIP as an academic/OSI mapping.

Do NOT claim Google Meet literally uses SIP internally.

L4 — TRANSPORT

Role:

"Provides end-to-end transport. Real-time media prioritizes low latency."

UDP — User Datagram Protocol

"Fast, connectionless transport suitable for real-time media."

TCP — Transmission Control Protocol

"Reliable, ordered and error-controlled transport."

L3 — NETWORK

Role:

"Provides logical addressing and routing between networks."

IPv4 — Internet Protocol Version 4

"Provides logical addressing and packet routing."

IPv6 — Internet Protocol Version 6

"Provides addressing and routing using IPv6."

ICMP — Internet Control Message Protocol

"Carries network control and diagnostic messages."

L2 — DATA LINK

Role:

"Provides node-to-node delivery and framing across the current network link."

ARP — Address Resolution Protocol

"Maps IPv4 addresses to MAC addresses on a local network."

PPP — Point-to-Point Protocol

"Provides data-link communication over point-to-point links."

HDLC — High-Level Data Link Control

"Provides framing and controlled data-link communication."

L1 — PHYSICAL

Role:

"Transmits raw bits as physical signals through the communication medium."

Do not force fake protocol names into Layer 1.

Display:

Physical Transmission

"Represents transmission through electrical, optical or radio signals."

============================================================

10. GOOGLE MEET VISUAL MUST LOOK REAL

============================================================

The current generic "Camera Off" / placeholder visuals are NOT acceptable.

Create a convincing video-conferencing simulation.

Use two video tiles:

USER A — HOST

Camera ON

USER B — PARTICIPANT

Before transmission:

"Waiting for video..."

After reception:

"Video received"

The video tiles should use high-quality realistic webcam-style visuals.

Requirements:

- Natural-looking person

- Webcam framing

- Indoor environment

- Realistic lighting

- 16:9 video tile

- Professional but natural

- No watermark

- No weird AI artifacts

- No cartoonish stock illustration

- No obvious generic avatar

Use DIFFERENT initial visuals for User A and User B.

After the video frame reaches User B, show the transmitted User A video frame/content on User B's screen.

The point is to visually communicate:

CAMERA

→ VIDEO FRAME

→ NETWORK

→ RECEIVED FRAME

→ DISPLAY

============================================================

11. GOOGLE MEET UI

============================================================

Create an original Google Meet-inspired interface.

Do NOT attempt an exact clone.

Include:

- Participant name

- Camera ON/OFF indicator

- Microphone indicator

- Call controls

- Meeting status

- Meeting timer

- Meeting link

- Join button during joining stage

- Connected status

- Video tiles

The center simulation should feel like an actual video call.

============================================================

12. NETWORK JOURNEY

============================================================

Create a prominent NETWORK JOURNEY section.

Show:

USER A DEVICE

↓

LOCAL / WI-FI ROUTER

↓

ISP ROUTER

↓

NETWORK / INTERNET

↓

GOOGLE MEET INFRASTRUCTURE

↓

INTERNET / NETWORK

↓

ISP ROUTER

↓

LOCAL / WI-FI ROUTER

↓

USER B DEVICE

Each component should be clearly labeled.

Do NOT use random decorative networking icons.

Use recognizable representations:

Laptop/device

Router

Network node

Internet/cloud

Server/infrastructure

The video-frame packet should physically move along the path.

============================================================

13. PACKET VISUALIZATION

============================================================

The packet should change as it moves through the OSI layers.

At sender:

VIDEO FRAME

↓

UDP DATA

↓

IP PACKET

↓

DATA-LINK FRAME

↓

BITS

At receiver:

BITS

↓

FRAME

↓

IP PACKET

↓

UDP DATA

↓

VIDEO FRAME

Use a clean nested/stacked visualization.

This is educational, not a packet-sniffing tool.

============================================================

14. ENCAPSULATION / DECAPSULATION

============================================================

Create a dedicated visual section.

LEFT:

ENCAPSULATION — USER A

Application Data

↓

Transport Data / UDP

↓

IP Packet

↓

Data-Link Frame

↓

Bits

CENTER:

NETWORK TRANSMISSION

Router

→ ISP

→ Internet

→ Google Meet Infrastructure

→ Internet

→ ISP

→ Router

RIGHT:

DECAPSULATION — USER B

Bits

↑

Data-Link Frame

↑

IP Packet

↑

Transport Data

↑

Application Data / Video Frame

Clearly label:

SENDER = ENCAPSULATION

RECEIVER = DECAPSULATION

============================================================

15. THE 7-LAYER SUMMARY

============================================================

At the bottom provide:

THE 7 OSI LAYERS AT A GLANCE

Use a clean table.

Columns:

Layer

Name

Role

Protocols

Do NOT make seven huge cards.

Keep it readable and compact.

============================================================

16. CONTROLS

============================================================

Provide:

[ START SIMULATION ]

[ PREVIOUS STEP ]

[ NEXT STEP ]

[ RESTART ]

[ AUTO PLAY ]

Also show:

STEP X OF 19

And phase:

ENCAPSULATION — SENDER

NETWORK TRANSMISSION

or

DECAPSULATION — RECEIVER

depending on the current state.

============================================================

17. VISUAL TRANSITION AT THE MIDDLE

============================================================

The transition between sender and receiver is extremely important.

After the sender completes L1:

Show:

✓ ENCAPSULATION COMPLETE

Then:

VIDEO FRAME PACKET

→

LOCAL ROUTER

→

ISP

→

INTERNET

→

GOOGLE MEET INFRASTRUCTURE

→

INTERNET

→

USER B

During this transition, temporarily emphasize the network components.

Then display:

DECAPSULATION — RECEIVER

and begin the receiver-side L1 → L7 progression.

============================================================

18. FINAL SCREEN

============================================================

After the final step:

✓ DECAPSULATION COMPLETE

User A:

Camera ON

↓

7 OSI LAYERS

↓

NETWORK

↓

7 OSI LAYERS

↓

User B:

Video Displayed

Message:

"Video frame successfully delivered from User A to User B."

Then show the key takeaway:

"At the sender, data moves down the OSI stack through encapsulation. After transmission across the network, the receiver processes the data upward through decapsulation until the application can display the video."

============================================================

19. TECHNICAL DISCLAIMER

============================================================

Add a small note:

"This is an educational OSI-model representation of a modern video-conferencing system. Real-world Google Meet networking uses modern Internet protocols and architectures that do not map perfectly one-to-one onto the seven OSI layers."

Do NOT claim that Google Meet literally implements every OSI layer as shown.

============================================================

20. MOST IMPORTANT UI RULE

============================================================

DO NOT make every element a card.

The previous versions looked too AI-generated because everything was placed inside rounded rectangular cards.

Instead use:

- Sections

- Timelines

- Layer stacks

- Network diagrams

- Video panels

- Thin dividers

- Small information panels

- One main current-layer panel

The OSI stacks, simulation steps, Google Meet screen and network journey should visually connect to each other.

The user should be able to understand the entire story without opening any popup.

============================================================

21. SUCCESS CRITERIA

============================================================

The finished simulation must make these things immediately obvious:

1. This is a Google Meet video-conferencing scenario.

2. User A is the sender.

3. User B is the receiver.

4. There are exactly 7 OSI layers.

5. Sender moves:

L7 → L6 → L5 → L4 → L3 → L2 → L1

6. Data travels through actual conceptual network components:

Device → Router → ISP → Internet → Google Meet Infrastructure → Internet → ISP → Router → Device

7. Receiver moves:

L1 → L2 → L3 → L4 → L5 → L6 → L7

8. The video frame is visibly encapsulated.

9. The packet visibly travels through the network.

10. The packet is visibly decapsulated.

11. User B finally sees the video frame.

12. There are at least 14 meaningful steps.

Preferably implement the full 19-step journey described above.

13. The UI is LIGHT, CLEAN and ACADEMIC.

14. The Google Meet video visuals look realistic and convincing.

15. The OSI layers are visually prominent and never hidden.

16. The simulation can be presented in a college Computer Networks laboratory viva.

============================================================

FINAL IMPLEMENTATION INSTRUCTION

============================================================

FIRST inspect the existing project.

If an existing implementation already contains useful components, reuse them.

Do NOT blindly regenerate the entire project.

Prioritize:

1. Correct 7-layer visualization

2. Detailed step-by-step state machine

3. Sender/receiver OSI stacks

4. Network journey with routers and infrastructure

5. Encapsulation/decapsulation

6. Realistic video-call visuals

7. Clear current-layer information

8. Clean light UI

9. Smooth but purposeful animations

The application should be functional, interactive and presentation-ready.

Do not add unnecessary features that distract from the OSI case study.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/373e558b-3335-45d0-a5ba-a4eb5656d179).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
