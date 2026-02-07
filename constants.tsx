
import { Tutorial, Circuit } from './types';

export const TUTORIALS: Tutorial[] = [
  {
    id: 'intro',
    title: 'Verilog Basics',
    category: 'Basics',
    description: 'Introduction to Verilog as a Hardware Description Language.',
    content: 'Verilog is a Hardware Description Language (HDL) used to model electronic systems. Unlike C or Python, it describes hardware structures and their parallel behavior rather than a sequence of instructions. A Verilog program consists of modules, which are the basic building blocks of any digital system.',
    codeSnippet: `module simple_gate(input a, input b, output y);
  assign y = a & b; // AND gate logic
endmodule`
  },
  {
    id: 'wire-vs-reg',
    title: 'Wire vs Reg',
    category: 'Core Concepts',
    description: 'The two primary data types in Verilog.',
    content: 'A `wire` represents a physical connection (like a copper trace). It does not store a value; it must be driven by an assignment. A `reg` (register) is used to represent data storage. In behavioral modeling (inside `always` blocks), target variables must be of type `reg`. Note: `reg` does not always imply a physical flip-flop!',
    codeSnippet: `wire connection; // Net type
reg data_store; // Variable type`
  },
  {
    id: 'gate-modeling',
    title: 'Gate-Level Modeling',
    category: 'Modeling',
    description: 'Using built-in primitives for low-level design.',
    content: 'Gate-level modeling is the lowest level of abstraction. You use built-in primitives like `and`, `or`, `nand`, `not`, etc. This style is closely tied to the physical hardware structure.',
    codeSnippet: `module gate_level(input a, b, output y);
  and a1(y, a, b); // and (out, in1, in2)
endmodule`
  },
  {
    id: 'dataflow-modeling',
    title: 'Dataflow Modeling',
    category: 'Modeling',
    description: 'Modeling through signal assignments.',
    content: 'Dataflow modeling uses the `assign` keyword to describe how data flows through the circuit. It is highly intuitive for combinational logic.',
    codeSnippet: `module dataflow(input a, b, output y);
  assign y = a | b; // Continuous assignment
endmodule`
  },
  {
    id: 'behavioral-modeling',
    title: 'Behavioral Modeling',
    category: 'Modeling',
    description: 'Describing what the circuit does using logic blocks.',
    content: 'Behavioral modeling uses `always` and `initial` blocks. This is the highest level of abstraction, allowing designers to describe logic using `if-else`, `case`, and loops.',
    codeSnippet: `module behavioral(input clk, d, output reg q);
  always @(posedge clk) begin
    q <= d; // Non-blocking assignment for sequential logic
  end
endmodule`
  },
  {
    id: 'always-blocks',
    title: 'Always Blocks',
    category: 'Core Concepts',
    description: 'The heartbeat of Verilog behavioral design.',
    content: '`always` blocks define procedural behavior. `always @(*)` is used for combinational logic (sensitive to any input change), while `always @(posedge clk)` is used for edge-triggered sequential logic.',
    codeSnippet: `always @(a, b) begin // Sensitive to a or b
  out = a & b;
end`
  },
  {
    id: 'testbenches',
    title: 'Testbench Examples',
    category: 'Verification',
    description: 'How to verify your Verilog code.',
    content: 'A testbench is a separate module (usually with no ports) used to provide stimulus to your design under test (DUT) and observe the outputs. It uses `initial` blocks and `$display` for debugging.',
    codeSnippet: `module tb;
  reg a, b; wire y;
  simple_gate dut(a, b, y);
  initial begin
    a = 0; b = 0; #10;
    a = 1; b = 1; #10;
    $finish;
  end
endmodule`
  }
];

export const CIRCUITS: Circuit[] = [
  {
    id: 'basic-gates',
    name: 'Basic Gates',
    category: 'Basic Gates',
    explanation: 'Basic logic gates are the building blocks of all digital circuits.',
    verilogCode: `module gates(input a, b, output y_and, y_or, y_not);
  assign y_and = a & b;
  assign y_or  = a | b;
  assign y_not = ~a;
endmodule`
  },
  {
    id: 'half-adder',
    name: 'Half Adder',
    category: 'Combinational',
    explanation: 'A circuit that adds two single-bit binary numbers. It produces a Sum and a Carry output.',
    verilogCode: `module half_adder(input a, b, output sum, carry);
  assign sum = a ^ b;
  assign carry = a & b;
endmodule`
  },
  {
    id: 'full-adder',
    name: 'Full Adder',
    category: 'Combinational',
    explanation: 'Adds three bits (A, B, and a Carry-in) to produce Sum and Carry-out.',
    verilogCode: `module full_adder(input a, b, cin, output sum, cout);
  assign sum = a ^ b ^ cin;
  assign cout = (a & b) | (b & cin) | (a & cin);
endmodule`
  },
  {
    id: 'mux-4to1',
    name: '4-to-1 Multiplexer',
    category: 'Combinational',
    explanation: 'Selects one of four input signals based on two selection bits.',
    verilogCode: `module mux4to1(input [3:0] i, input [1:0] sel, output reg out);
  always @(*) begin
    case(sel)
      2'b00: out = i[0];
      2'b01: out = i[1];
      2'b10: out = i[2];
      2'b11: out = i[3];
      default: out = 1'b0;
    endcase
  end
endmodule`
  },
  {
    id: 'd-flip-flop',
    name: 'D Flip-Flop',
    category: 'Sequential',
    explanation: 'Captures the value of the D input at the positive edge of the clock.',
    verilogCode: `module dff(input clk, rst, d, output reg q);
  always @(posedge clk or posedge rst) begin
    if (rst) 
      q <= 1'b0;
    else
      q <= d;
  end
endmodule`
  },
  {
    id: 'counter-4bit',
    name: '4-bit Binary Counter',
    category: 'Sequential',
    explanation: 'A circuit that increments its value by 1 on every clock pulse.',
    verilogCode: `module counter_4bit(input clk, rst, output reg [3:0] count);
  always @(posedge clk or posedge rst) begin
    if (rst)
      count <= 4'b0000;
    else
      count <= count + 1;
  end
endmodule`
  }
];
