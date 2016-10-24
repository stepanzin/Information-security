TEXT = "1dkfjhs"
KEY = "1010"
ROUND = 4

class String
  def convert_base(from, to)
    self.to_i(from).to_s(to)
  end
end

def xor(arg1, arg2)
	xored = arg1.split("").map.with_index do |a, i|
		a.to_i ^ arg2[i].to_i
	end.join("")
end

def Feistel_cipher(text, key, round)

	array_b = []

	text.split("").each do |ch|
 	  array_b << ch.unpack("B*")[0]
	end

	(round-1).times do 
		array_b.each do |b|
		  left = b[0...b.size/2]
		  right = b[b.size/2...b.size]
		  buf = right
		  right = left
		  left = xor(xor(left, key), buf)

		  b[0...b.size/2] = left
		  b[b.size/2...b.size] = right
		end
		key = key.split("").rotate.join("")
	end

	array_b.each do |b|
		left = b[0...b.size/2]
		right = b[b.size/2...b.size]
		right = xor(xor(left, key), right)
		b[b.size/2...b.size] = right
	end

	#array_b.map!  do |ch|
	#  (ch.convert_base(2, 10).to_i % 128).to_s(2).rjust(8, '0') # перевод бинарных чисел в бинарные числа
	  # выводимых консолью символов	
	#end
	coded = [array_b.join("")].pack("B*")
	puts "Coded:"
	puts coded
	puts "Decoded: "
	Feistel_cipher_decode(coded, key, round)
end

def Feistel_cipher_decode(text, key, round)
	array_b = []

	text.split("").each do |ch|
 	  array_b << ch.unpack("B*")[0]
	end

	(round-1).times do 
		array_b.each do |b|
		  left = b[0...b.size/2]
		  right = b[b.size/2...b.size]
		  buf = right
		  right = left
		  left = xor(xor(left, key), buf)		  
		  b[0...b.size/2] = left
		  b[b.size/2...b.size] = right
		end
		key = key.split("").rotate(-1).join("")
	end

	array_b.each do |b|
		left = b[0...b.size/2]
		right = b[b.size/2...b.size]
		#puts "key #{key}" 
		right = xor(xor(left, key), right)
		b[b.size/2...b.size] = right
	end

	puts [array_b.join("")].pack("B*")
end

puts "Please type your text here: "
text = gets.chomp
puts "And the number of rounds: "
round = gets.chomp

Feistel_cipher(text, KEY, round.to_i)