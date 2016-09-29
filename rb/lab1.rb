TEXT = 'ABCDEFGHJKL'
TRANSPOSITION_CODE = '2134'
DEFAULT_SYMBOL = '@'

def transposition(text, code_str, mode)

	block_size = code_str.length
	array = text.scan(/.{1,#{block_size}}/)
	code = code_str.split("")

	if mode == '1' 

		array.map! do  |block|

			while block.length < block_size
				block.replace block + DEFAULT_SYMBOL
			end

			array1 = block.split("")

			array1.map!.with_index do |ch, i|
				ch = block.split("")[code[i].to_i-1]
			end

		block.replace array1.join

		end
	end

	if mode == '2'

		array.map! do  |block|

			array1 = block.split("")

			array1.map!.with_index do |ch, i|
				ch = block.split("")[code[i].to_i-1]
			end

			array1.delete(DEFAULT_SYMBOL)
			block.replace array1.join

		end

	end

	puts "The result:"
	puts array.join.inspect
end

def Vigenère_Beaufort(text, mode, key = nil)
	if mode == '1'
		key = (0...text.length).map { ('a'..'z').to_a[rand(26)] }
		puts "The key is: #{key.join("")}"
		#arr = text.split("")
		#array_of_upcase_indexes = arr.each_index.select{|i| arr[i].match(/[A-Z]/)}
		arr = text.split("")
		arr.map!.with_index do |character, i|
			num = character.ord
			shove = key[i].ord

			if (num > 64 and num < 91)

				num = 65 + (num + shove-65)%26

			end

			if (num > 96 and num < 123)

				num = 97 + (num + shove-97)%26 
					
			end

			if (num > 47 and num < 58)

				num = 48 + (num + shove-48)%10

			end

			character = num.chr	
		end
	end

	if mode == '2'
		key_arr = key.split("")
		arr = text.split("")
		arr.map!.with_index do |character, i|
			num = character.ord
			shove = key[i].ord

			if (num > 64 and num < 91)

				num = (num - shove-65)%26 + 65

			end

			if (num > 96 and num < 123)

				num = (num - shove-97)%26 + 97
					
			end

			if (num > 47 and num < 58)

				num = (num - shove-48)%10 + 48

			end

			character = num.chr	
		end	
	end
	print "The result: "
	puts arr.join("")
	
end
work = true
puts "Select the mode: "
puts "1. Coding"
puts "2. Decoding"
while (work)
	mode = gets.chomp
	if mode != '1' and mode != '2'
		puts "Wrong number. Try again!"
		next
	end
	puts "Select the method of coding:"
	puts "1. Transposition"
	puts "2. Vigenère_Beaufort"
	while(true)
		method = gets.chomp
		if method == '1'

			puts "Please type your text:"
			text = gets.chomp
			puts "And transposition code:"
			code = gets.chomp
			transposition(text, code, mode)
			work = false
			break

		elsif  method == '2'

			puts "Please type your text:"
			text = gets.chomp 
			if mode == '2'
				puts "And the key:"
				key = gets.chomp
			end
			Vigenère_Beaufort(text, mode, key)
			work = false
			break

		else 
			puts "Wrong number. Try again!"
		end
	end
end