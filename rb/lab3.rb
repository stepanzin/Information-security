random_key =  (1..256).map { [0, 1].sample }.join
KEY = ("0"*32+"1"*32+"01"*16+"10"*16)*2
TEXT = "abcdefgh"

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

def add_binary(first, second)
  res = (first.to_i(2)+second.to_i(2)).to_s(2).rjust(32, '0')
  if res.size > 32
	res = res[1..32]
  end
  res
end

def f(part, key)
  s_blocks = [[1, 15, 13, 0, 5, 7, 10, 4, 9, 2, 3, 14, 6, 11, 8, 12], [1, 5, 0, 13, 15, 7, 10, 4, 9, 2, 3, 14, 6, 11, 8, 12],
  [1, 15, 13, 7, 0, 5, 10, 4, 9, 2, 3, 14, 6, 11, 8, 12], [10, 15, 13, 0, 5, 7, 1, 2, 4, 9, 3, 14, 6, 11, 8, 12],
  [12, 15, 13, 0, 5, 7, 10, 4, 9, 2, 3, 14, 6, 11, 8, 11], [1, 15, 13, 0, 5, 7, 10, 4, 9, 2, 3, 14, 6, 11, 12, 8],
  [1, 15, 13, 0, 5, 7, 10, 9, 4, 2, 14, 3, 6, 11, 8, 12], [1, 15, 13, 0, 5, 7, 10, 4, 9, 3, 2, 6, 14, 11, 8, 12]]

  res = add_binary(part, key)
  res_arr = res.split("").each_slice(4).map(&:join)

  word = res_arr.map!.with_index do |p, i|
    p_d = p.convert_base(2, 10).to_i
    s_blocks[i][p_d].to_s(2).rjust(4, '0')
  end.join("").split("").rotate(11).join("")

end

def gost(text, key1)

  array_b = []
  key2 = key1
  text.split("").each do |ch|
	array_b << ch.unpack("B*")[0]
  end

  array_b_64 = array_b.each_slice(8).map(&:join)
  key_parts = key1.chars.each_slice(32).map(&:join)

  j = 8
  31.times do |i|

    if i < 24
	  key = key_parts[i%8]
	else
	  j -= 1
	  key = key_parts[j]
	end

	array_b_64.each do |b|
	  left = b[0...b.size/2]
	  right = b[b.size/2...b.size]
	  buf = left
	  left = right
	  right = xor(f(right, key), buf) 
	  b[0...b.size/2] = left
	  b[b.size/2...b.size] = right
	end
  end

  array_b_64.each do |b|
	key = key_parts[0]
	left = b[0...b.size/2]
	right = b[b.size/2...b.size]
	left = xor(f(right, key), left)
	b[0...b.size/2] = left
  end

  coded = [array_b_64.join("")].pack("B*")
  puts "Coded text: #{coded}"
  decoded = gost_decode(coded, key2)
  puts "Decoded text: #{decoded}"
end

def gost_decode(text, key)
  array_b = []

  text.split("").each do |ch|
	array_b << ch.unpack("B*")[0]
  end

  array_b_64 = array_b.each_slice(8).map(&:join)
  key_parts = key.chars.each_slice(32).map(&:join)

  j = -1

  31.downto(1) do |i|

	if i < 24
	  key = key_parts[i%8]
	else
	  j += 1
	  key = key_parts[j]
	end

	array_b_64.each do |b|
	  left = b[0...b.size/2]
	  right = b[b.size/2...b.size]
	  buf = left
	  left = right
	  right = xor(f(right, key), buf)
	  b[0...b.size/2] = left
	  b[b.size/2...b.size] = right
	end
  end

  array_b_64.each do |b|
	key = key_parts[0]
	left = b[0...b.size/2]
	right = b[b.size/2...b.size]
	left = xor(f(right, key), left)
	b[0...b.size/2] = left
  end
  [array_b_64.join("")].pack("B*")
end

puts "Please type your text here: "
text = gets.chomp
if text.size % 8 != 0
  remainder = text.size % 8
  q = 8-remainder
  text = text + "@"*q
end

gost(text, random_key)